import Header from './bootstrap/Header';
import Carousel from 'react-bootstrap/Carousel';

function Main() {
    console.log("Rendering - Main")

    return (
        <>
            <Header/>
            <div>
            <Carousel variant="dark" fade>
                <Carousel.Item>
                    <br/>
                    <h3 style={{ textAlign: 'center' }}>Kontroluj swoje wydatki</h3>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <Carousel.Caption>
                        <h3>Sprawdź na co wydajesz najwięcej</h3>
                        <p>Dowiedz się na czym możesz zaoszczędzić</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <br/>
                    <h3 style={{ textAlign: 'center' }}>Planuj i symyluj swoje wydatki</h3>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <Carousel.Caption>
                        <h3>Sprawdź ile musisz zarabiać miesięcznie żeby móc coś kupic</h3>
                        <p>Sprawdź kiedy będzie cię na coś stać</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <br/>
                    <h3 style={{ textAlign: 'center' }}>Sprawdź ile zarabiasz a ile oszczędasz miesięcznie</h3>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <Carousel.Caption>
                        <h3>Połącz się ze swoim bankiem</h3>
                        <p>Twórz i przełączaj widoki</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            </div>
        </>
    )
}

export default Main;