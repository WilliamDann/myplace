import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image';

export default function()
{
    return ( 
    <Container className='w-100'>
        <Image style={{opacity: 0.4, zIndex: 0}} className="fixed-bottom w-100" src="img/buildings.png"/>
    </Container>
    );

}