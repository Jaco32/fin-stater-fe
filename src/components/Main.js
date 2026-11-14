import Header from './Header';

function Main() {
    console.log("Rendering - Main")

    return (
        <>
            <Header/>
            <div className="p-5 mw-100">
                <h1 style={{ display: 'inline-block', height: '400px'}}>A</h1>
                <img src="main_page.png" style={{ width: '60%', float: 'right', border: '3px solid lightgray'}} className='rounded'/>
            </div>
            <div className="p-5 mw-100">
                <img src="categorized.png" style={{ width: '50%', border: '3px solid lightgray'}} className='rounded'/>
                <h1 className="align-top ms-4" style={{ display: 'inline'}}>B</h1>
            </div>
            <div className="p-5 mw-100">
                <h1 style={{ display: 'inline-block', height: '400px'}}>C</h1>
                <img src="monthly.png" style={{ width: '60%', float: 'right', border: '3px solid lightgray'}} className='rounded'/>
            </div>            
        </>
    )
}

export default Main;