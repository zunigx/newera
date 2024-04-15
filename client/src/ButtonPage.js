import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ButtonPage() {
    const [redirecting, setRedirecting] = useState(false);

    const handleButtonClick = () => {
        setRedirecting(true);
        // Puedes realizar alguna tarea adicional aquí antes de redirigir, si es necesario
    };

    return (
        <div className="col-md-6">
            {!redirecting && (
                <>
                    <h1 className="text-center mb-4">Acceder</h1>
                        <Link to="/inicioDash">
                            <button className='btn btn-primary btn-lg btn-block' onClick={handleButtonClick}>Ir al Dashboard</button>
                        </Link>
                </>
            )}
        </div> 
    );
}

export default ButtonPage;
