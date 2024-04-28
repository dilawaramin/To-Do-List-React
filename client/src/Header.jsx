

function Header( {title} ) {


    return (

        <header className='header' h1text={title}>
            <div className='header-div-title'>
                <h1 className='primary-text header-title'>
                    Your To-Do List
                </h1>
            </div>
        </header>
    );
}


export default Header