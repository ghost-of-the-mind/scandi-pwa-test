import {
    Checkout as SourceCheckout,
} from 'SourceRoute/Checkout/Checkout.component';

import ContentWrapper from 'Component/ContentWrapper';

import './Checkout.override.style.scss';

/** @namespace Scandi/Route/Checkout/Component */
export class CheckoutComponent extends SourceCheckout {

    //* Replace allSteps with the list of steps
        allSteps = ['Shipping', 'Billing', 'Success'];

    //* Method for creating the multi-step progress bar */
        stepProgressBar() {

            //* Data from state and props
                const { checkoutStep } = this.props;
                const { url } = this.stepMap[checkoutStep];

            //* The step the user is currently on
                const currentStep = url.substring(1).charAt(0).toUpperCase() + url.substring(1).slice(1);

            return (
                <div block="Checkout" elem="ProgressBar-Wrapper">
                    {this.allSteps.map((e, index) => {

                        //* Indexes
                            const myIndex = index;
                            const currentIndex = this.allSteps.findIndex(e => e === currentStep)

                        return (
                            <div 
                                block="Checkout" 
                                elem="ProgressBar-Step" 
                                mods={{
                                    active: currentStep === e ? true : false,
                                    inactive: currentStep !== e ? true : false,
                                }}
                                
                                key={e}
                            >

                                <div
                                    block="Checkout" 
                                    elem="ProgressBar-Divider"
                                    mods={{
                                        active: currentStep === e ? true : false,
                                        inactive: currentStep !== e ? true : false,
                                        completed: myIndex < currentIndex ? true : false
                                    }}
                                ></div>

                                <div block="Checkout" elem="ProgressBar-Content">
                                    <div 
                                        block="Checkout" 
                                        elem="StepBadge" 
                                        mods={{
                                            active: currentStep === e ? true : false,
                                            inactive: currentStep !== e ? true : false,
                                            completed: myIndex < currentIndex ? true : false 
                                        }}
                                    >
                                        <p>
                                            {myIndex < currentIndex ? "✔" : index + 1}
                                        </p>
                                    </div>

                                    <p 
                                        block="Checkout" 
                                        elem="Step-Name" 
                                        mods={{
                                            active: currentStep === e ? true : false,
                                            inactive: currentStep !== e ? true : false,
                                            completed: myIndex < currentIndex ? true : false
                                        }}
                                    >
                                        {e}
                                    </p>
                                </div>

                                <div
                                    block="Checkout" 
                                    elem="Final-ProgressBar-Divider"
                                    mods={{
                                        // active: currentStep === e ? true : false,
                                        inactive: currentStep !== e ? true : false,
                                        completed: myIndex <= currentIndex ? true : false
                                    }}
                                ></div>

                            </div>
                        )
                    })}
                </div>
            )
        }


    render() {
        return (
            <main block="Checkout">

                { this.stepProgressBar() }

                <ContentWrapper
                  wrapperMix={ { block: 'Checkout', elem: 'Wrapper' } }
                  label={ __('Checkout page') }
                >
                    { this.renderSummary(true) }
                    <div block="Checkout" elem="Step">
                        { this.renderTitle() }
                        { this.renderGuestForm() }
                        { this.renderStep() }
                        { this.renderLoader() }
                    </div>
                    <div>
                        { this.renderSummary() }
                        { this.renderPromo() }
                        { this.renderCoupon() }
                    </div>
                </ContentWrapper>
            </main>
        );
    }
}

export default CheckoutComponent; 
