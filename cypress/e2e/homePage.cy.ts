import {homePage} from '../../pageObject/index';
import {navBarValue} from "../../utilities/data";
import { promoBlockValue} from "../../utilities/data";
import { promoBlockSubtext} from "../../utilities/data";

describe('HOMEPAGE', () => {

    beforeEach('open homepage', () => {
        homePage.open();
    })

    it('verify navbar menu ', () => {
        homePage.verifyNavbarMenu(navBarValue);
    });

    it.only('verify promo-section', () => {

        homePage.verifyPromoSectionHeaders(promoBlockValue);
        homePage.verifyPromoSectionSubtext(promoBlockSubtext);

    })

});


