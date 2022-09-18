import'./DoctorForm.css';

export default function(){

    return(
        <div className="doctor-form-container">
            <form action="" id="doctor-form">
                <input type="text" name="name"/>
                <input type="time" />
                <input type="radio" id="15" name="15" value="1" checked/><label for="15">15 min</label>
                <input type="radio" id="30" name="30" value="2" checked/><label for="30">30 min</label>
                <input type="radio" id="45" name="45" value="3" checked/><label for="45">45 min</label>
                <input type="radio" id="60" name="60" value="4" checked/><label for="60">60 min</label>
                <input type="text" name="address" />
                <input type="text" name="description"/>
                <input type="text" name="extra-info"/>
            </form>
        </div>
    )
}