import React from 'react'
import Header from '../modules/header'
import Footer from '../modules/footer'

export default class OrderProcedure extends React.Component {
    render(){
        return(
            <div>
                <Header/>
                <div className='global__title'><h2>Užsakymo pateikimas</h2></div>
                <div className='orderProcedure'>
                    <p>
                        Paslaugų užsakymo pateikimas itin parpastas, tam prireiks vos kelių žingsnių:
                    </p>
                    <ul>
                        <li>
                            Nueikite į <a href='/list'>rėmų puslapį</a> iš išsirinkite jums patikusį rėmą;
                        </li>
                        <li>
                            Užpildykite duomenis t.y. darbo didį, norimas medžiagas;
                        </li>
                        <li>
                            Formos apačioje pamatysite preliminarią kainą, jei viską suvedėte teisingai 
                            spauskite mygtuką Užsakyti.
                        </li>
                    </ul>
                    <p>
                        Pateikus užsakymą, visus savo užsakymus matysite <a href='/orders'>užsakymų puslapyje</a>.
                    </p>
                    <p>
                        Po užsakymo pateikimo atneškite savo darbą į mūsų rėminimo dirbtuves Vilniuje adresu Dysnos g. 4.
                        Meistrui įvertinus darbą patikslinsime galutinę kainą.
                    </p>
                    <p>
                        Darbų atlikimo terminas priklauso nuo užimtumo, tačiau priimame ir skubius užsakymus kuriuos 
                        atliekame per 1-2 darbo dienas.
                    </p>
                </div>
                <Footer />
            </div>
        )
    }
}
