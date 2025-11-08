import Header from './bootstrap/Header';

function Main() {
    console.log("Rendering - Main")

    return (
        <>
            <Header/>
            <div style={{ textAlign: 'center' }}>
                <h1>TODO</h1>
            </div>
        </>
    )
}

export default Main;