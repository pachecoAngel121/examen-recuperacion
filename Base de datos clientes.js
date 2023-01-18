function actualizarCorreo(req,res, cedula){

    const cedula =req.body.cedula;
    const correoelectronico =req.body.correoelectronico;

    //Validaciones 
    const ExpresionRegularSoloNumero = /\d+$/gi;

    //Validaciones de los datos con el metodo test
   if (ExpresionRegularSoloNumero.test(cedula) || cedula.length<=10){
      try {
        return 'Número de cédula es correcto'
      } catch (error) {
       return 'Dato cédula no cumple con longitud  o no son solo números '
      }
    }


          //Validamos que los datos no estan vacio
    if (!cedula) {

        return res.render('insertarClientes', {
            message: 'No se ha recibido la cédula correctamente en la vista cliente'
        });
    }
    if (!cedula) {

        return res.render('insertarFactura', {
            message: 'No se ha recibido la cédula correctamente en la vista factura'
        });
    }

    // Base de datos clientes
    conexion.query('SELECT * FROM clientes WHERE  cedula = ?  ', [cedula], (error, result) => {

        //código que permita actualizar la bd
        if (result == 0) {
            conexion.query('UPDATE INTO clientes SET ? WHERE cedula = ?', { cedula:cedula,  correoelectronico: correoelectronico }, (error, results) => {
                if (error) {
                    console.log(error);
                } else {
                    res.redirect('./listaCorreo');
                }
            });

        } else {
            console.log('El correo ya existe')
            res.render('insertarClientes', {
                message: 'El correo ya existe'
            });
        }
    })

    // Base de datos factura
    conexion.query('SELECT * FROM factura WHERE  cedula = ?  ', [cedula], (error, result) => {

        //código que permita actualizar en la bd
        if (result == 0) {
            conexion.query('UPDATE INTO factura SET ? WHERE cedula = ?', { cedula:cedula,  correoelectronico: correoelectronico }, (error, results) => {
                if (error) {
                    console.log(error);
                } else {
                    res.redirect('./listaFactura');
                }
            });

        } else {
            console.log('El correo ya existe')
            res.render('insertarFactura', {
                message: 'El correo ya existe'
            });
        }
    })

};
