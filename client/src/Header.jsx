

function Header( {title} ) {


    return (

        <header className='header' h1text={title}>
            <div className='header-div-title'>
                <h2 className='primary-text header-title'>
                    Your To Do List!
                </h2>
            </div>
        </header>
    );
}


export default Header