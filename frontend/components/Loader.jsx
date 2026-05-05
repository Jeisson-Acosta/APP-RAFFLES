import '../styles/Loader.css'

export function Loader() {
    return (
        <div className="principal-container-loader">
            <div className="cart-loader">
                    <div className="items-container">
                        <div id="item-mobile" className="item"></div>
                        <div id="item-laptop" className="item"></div>
                        <div id="item-tab" className="item"></div>
                        <div id="item-headphone" className="item"></div>
                        <div id="item-mixer" className="item"></div>
                    </div>

                    <div id="cart-icon"></div>

                    <div className="loading-text">
                        Loading<span className="dot">.</span><span className="dot">.</span>
                        <span className="dot">.</span>
                    </div>
            </div>
        </div>
    )
}