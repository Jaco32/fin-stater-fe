import Header from './bootstrap/Header';

function Main() {
    console.log("Rendering - Main")

    return (
        <>
            <Header/>
            <div class="p-5 mw-100">
                <h1 style={{ display: 'inline-block', height: '400px'}}>Ogarniaj finanse z FinStat'em</h1>
                <img src="main_page.png" style={{ width: '60%', float: 'right', border: '3px solid lightgray'}} className='rounded'/>
            </div>
            <div class="p-5 mw-100">
                <img src="categorized.png" style={{ width: '50%', border: '3px solid lightgray'}} className='rounded'/>
                <h1 className="align-top ms-4" style={{ display: 'inline'}}>Sprawdź na co wydajesz najwięcej</h1>
            </div>
            <div class="p-5 mw-100">
                <h1 style={{ display: 'inline-block', height: '400px'}}>Śledź miesięczne statystyki</h1>
                <img src="monthly.png" style={{ width: '60%', float: 'right', border: '3px solid lightgray'}} className='rounded'/>
            </div>            
        </>
    )
}

export default Main;