import "./Card.scss"

const Card = (props) => {
    // console.log(props);

    let title = null
    if (props.title) {
        title = (
            <div className="card-header">
                {props.title}
                {props.icon}
            </div>
        )
    }
    return (
        <div className={` card ${props.className}`} style={props.style}>
            {title}

            <div className="card-body">
                {props.body} {props.children}
            </div>
            <div className="card-footer">
                <span>{props.footer}</span>
            </div>
            <div className="__admin_dashboard_last_addon">
                <span className="__admin_dashboard_last_addon_percentage"></span>
                <span className="__admin_dashboard_card_explanation"></span></div>
        </div>
    )
}

export default Card