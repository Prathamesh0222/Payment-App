export const Balance = ({value}) => {
    return <div>
        <div className="font-bold text-xl">
            Your balance
        </div>
        <div className="font-semibold text-2xl" >
            Rs {value}
        </div>
    </div>
}