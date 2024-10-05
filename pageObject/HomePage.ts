import { NavBarValues } from "../interface/interface";
import { PromoSectionValue } from "../interface/interface";


export class HomePage {
   // constructor(){    }

    navbar = () => cy.get('.nav-pills');
    siblingsNavBar = () => cy.get('> li > a');
    promoSection  = () => cy.get('.promo_section');
    siblingsPromoBlock = () => cy.get('.promo_block > .promo_text');
    siblingsPromoBlockHeaders = () => cy.get('.promo_block > .promo_text > h2');
    // // for example
    // navbar2 = () => '.nav-pills';
    //  //arr = document.querySelectorAll('.nav-pills  > li > a');
     verifyNavbarMenu = (navBarValue: NavBarValues ): void => {
        this.navbar().within( () => {
                this.siblingsNavBar().each( (el, i) => {
                    //cy.wrap(el.text());
                    cy.log(el.text());
                    console.log(el.text());
                    expect(el.text().trim(), `Recieved text: ${el.text().trim()}, should be: ${navBarValue[i]}`).equal(navBarValue[i]);
                    cy.wrap(el).invoke("text").invoke('trim').should('eq', navBarValue[i]);

                })
        })

    }

    verifyPromoSectionHeaders = (promoBlockVal: PromoSectionValue ): void => {
            this.promoSection().within( () => {
                this.siblingsPromoBlockHeaders().each( (el,i) => {

                    expect(el.text().trim(), `Recieved text: ${el.text().trim()}, should be: ${promoBlockVal[i]}`).eq(promoBlockVal[i]);
                    cy.wrap(el).invoke("text").invoke('trim').should('eq', promoBlockVal[i]);

                })
            })
    }



    verifyPromoSectionSubtext = (promoBlockVal: PromoSectionValue): void => {
         this.promoSection().within( () => {
             this.siblingsPromoBlock().each( (el,i) => {

                let start: number = el.html().lastIndexOf('>');
                expect( el.html().slice(start+1).trim(), `Recieved text: ${el.text().trim()}, should be: ${promoBlockVal[i]}`).eq(promoBlockVal[i]);

             })

         })
    }

    open = (): void => {
        cy.visit('/');
    }

}







