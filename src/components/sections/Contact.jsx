import React from 'react'
import image from '../../assets/ContactIllustration.svg';

export function Contact(props) {
    

    return (
        <section class="d-flex flex-column mt-5 w-100 m-auto section-spacing-1">
            <div class="w-75 m-auto">
                <h2 class="display-1 text-primary text-start">Have some feedback?</h2>
                <div class="d-flex flex-row justify-content-between mt-5">
                    <div class="w-50">
                        <p class="fs-1 text-start text-light">If you have any suggestions, bug reports, or general questions about LFGamer please don't hesitate
                        to reach out so we can work on getting those added or resolved swiftly.</p>
                        <div class="p-3 text-start mt-5">
                            <a class=" px-4 py-3 bg-secondary secondary-link w-25 rounded-pill fs-2 text-light" href="mailto:dylan.sieren01@gmail.com">Reach Out</a>
                        </div>
                    </div>
                    <div class="w-50">
                        <img class="w-75"src={image}/>
                    </div>
                </div>
            </div>
        </section>
    )
}