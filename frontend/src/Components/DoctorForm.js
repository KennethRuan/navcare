import'./DoctorForm.css';
import {useState} from 'react'
import axios from 'axios';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
  } from "@reach/combobox";
  import "@reach/combobox/styles.css";

let google = window.google;

export default function DoctorForm() {
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: "AIzaSyAeufE-n5QFRUQU3TlBoKXxqNHmmCl-oEw",
      libraries: ["places"],
    });
  
    if (!isLoaded) return <div>Loading...</div>;
    return <FormDisplay />;
  }

function FormDisplay(){
    let [dataObj,setDataObj] = useState({
        name:"",
        hour:0,
        minute:0,
        endTime:0,
        address:"",
        description:"",
        extraInfo:""
    })

    function updateData(prop){
        return function(e){
            setDataObj({
                    ...dataObj,
                    [prop]: e.target.value
                })
        }
    }

    function submitDoctorForm(e){
        e.preventDefault();
        let lat;
        let long; 

        let geocoder = new google.maps.Geocoder();
        let address = "200 Ring Rd, Waterloo, ON N2L 3G1"
        geocoder.geocode( { 'address': dataObj.address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK)
            {
                lat = results[0].geometry.location.lat()
                long = results[0].geometry.location.lng()
                post(lat,long);
            }
        });

       
    }

    function post(lat,long){
        axios.post(
            '/api/appointments/', {
                data: {...dataObj,"lat":lat,"long":long}
            })
            .then(res => console.log(res))
    }

    const PlacesAutocomplete = () => {
        const {
          ready,
          value,
          setValue,
          suggestions: { status, data },
          clearSuggestions,
        } = usePlacesAutocomplete();
      
        const handleSelect = async (address) => {
          setValue(address, false);
          clearSuggestions();
        };
      
        return (
          <Combobox onSelect={handleSelect}>
            <ComboboxInput
              value={value}
              onChange={(e) => setValue(e.target.value)}
              disabled={!ready}
              className="combobox-input"
              placeholder="Search an address"
            />
            <ComboboxPopover>
              <ComboboxList>
                {status === "OK" &&
                  data.map(({ place_id, description }) => (
                    <ComboboxOption key={place_id} value={description} />
                  ))}
              </ComboboxList>
            </ComboboxPopover>
          </Combobox>
        );
    }

    return(
        <div className="doctor-form-container">
            <form action="" id="doctor-form">
                <label for="name">Patient Name</label>
                <input type="text" name="name" id="name" onChange={updateData("name")}/>

                <label for="start-time">Start Time</label>
                <div className='select-dropdown'>
                    <select className='selector' name="hour" id="hour" onChange={updateData("hour")}>
                        <option value="0">12am</option>
                        <option value="4">1am</option>
                        <option value="8">2am</option>
                        <option value="12">3am</option>
                        <option value="16">4am</option>
                        <option value="20">5am</option>
                        <option value="24">6am</option>
                        <option value="28">7am</option>
                        <option value="32">8am</option>
                        <option value="36">9am</option>
                        <option value="40">10am</option>
                        <option value="44">11am</option>
                        <option value="48">12pm</option>
                        <option value="52">1pm</option>
                        <option value="56">2pm</option>
                        <option value="60">3pm</option>
                        <option value="64">4pm</option>
                        <option value="68">5pm</option>
                        <option value="72">6pm</option>
                        <option value="76">7pm</option>
                        <option value="80">8pm</option>
                        <option value="84">9pm</option>
                        <option value="88">10pm</option>
                        <option value="92">11pm</option>
                    </select>
                    <select className='selector' name="minute" id="minute" onChange={updateData("minute")}>
                        <option value="0">00min</option>
                        <option value="1">15min</option>
                        <option value="2">30min</option>
                        <option value="3">45min</option>
                    </select>
                </div>

                <span>Select the Appointment Length</span>
                <div className="length-select">
                    <label for="15">
                        <input type="radio" id="15" name="value" value="1" onChange={updateData("endTime")}/>
                        15 min
                        </label>  
        
                    
                        <label for="30">
                    <input type="radio" id="30" name="value" value="2" onChange={updateData("endTime")}/>
                        30 min</label>
                    

                
                        <label for="45">
                    <input type="radio" id="45" name="value" value="3" onChange={updateData("endTime")}/>
                    45 min</label>

                    <label for="60">
                    <input type="radio" id="60" name="value" value="4" onChange={updateData("endTime")}/>
                    60 min</label>
                </div>

                <label for="address" >Patient Address</label>
                <div className="places-container">
                    <PlacesAutocomplete/>
                </div>

                <label for="description" >Patient Description</label>
                <input type="text" name="description" id="description" onChange={updateData("description")} />

                <label for="extra-info" >Nurse Info</label>
                <input type="text" name="extra-info" id="extra-info" onChange={updateData("extraInfo")}/>
                <button type="submit" for="doctor-form" onClick={submitDoctorForm}>Submit</button>
            </form>
        </div>
    )
}