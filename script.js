async function fetchPatientPersonalInfo() {
    try {
        // Create the Basic Auth header
        const username = 'coalition';
        const password = 'skills-test';
        const base64Credentials = btoa(`${username}:${password}`);
        
        const response = await fetch('https://fedskillstest.coalitiontechnologies.workers.dev', {
            method: 'GET', // Specify the request method
            headers: {
                'Authorization': `Basic ${base64Credentials}`,
                'Content-Type': 'application/json', // Optional, if you're expecting JSON response
            }
        });

        if (!response.ok) {
            throw new Error('Error: Unable to fetch patient data.');
        }

        const data = await response.json();

        //Patient List Data Add function
        addPatientListData(data);


        //Chart Data Function
        addChartDataFunction(data);

        // Blood Pressure Data Add Function
        addBloodPressure(data);

        //Patient Diagnosis History Data Add function
        addPatientDiagnosisListData(data);

        //Patient Diagnosis List Data Add function
        // addPatientDiagnosisHistoryData(data);
        aaPatientDiagnosisHistory(data);

        //Personal Patient Data Add function Call
        addPersonalData(data);

        //Lab Test Data Add function Call
        addLabTextData(data)
        

    } catch (error) {
        console.error('Error fetching patient data:', error);
        alert('Failed to load patient information.');
    }
}

fetchPatientPersonalInfo();

//Patient List Data Add function Define
function addPatientListData(data){
    console.log('Inside the addPatientListData function');
    console.log(data);

    const patientListMainDiv = document.getElementById("patientList")
    data.forEach((result) => {
        patientDiv = document.createElement('div');
        patientDiv.className = 'nav-profile-data';
        patientDiv.style.justifyContent = 'space-between';
        patientDiv.style.margin = '15px 0 0 0';

        patientInfoDiv = document.createElement('div');
        patientInfoDiv.className = 'nav-profile-data-info';

        patientMainImgDiv = document.createElement('div')

        patientImgTag = document.createElement('img')
        patientImgTag.style.height = '40px';
        patientImgTag.style.width = '40px';
        patientImgTag.src = result.profile_picture        


        patientMainImgDiv.appendChild(patientImgTag);

        patientNameInfoDiv = document.createElement('div');

        patientNameInfoSpan1 = document.createElement('span');
        patientNameInfoSpan1.style.fontSize = '14px'
        patientNameInfoSpan1.textContent = result.name

        patientNameInfoBrTag = document.createElement('br');

        patientNameInfoSpan2 = document.createElement('span')
        patientNameInfoSpan2.style.fontSize = '12px';
        patientNameInfoSpan2.style.color = '#707070';
        patientNameInfoSpan2.textContent = `${result.gender},${result.age}`

        patientNameInfoDiv.appendChild(patientNameInfoSpan1)
        patientNameInfoDiv.appendChild(patientNameInfoBrTag)
        patientNameInfoDiv.appendChild(patientNameInfoSpan2)

        patientInfoDiv.appendChild(patientMainImgDiv)
        patientInfoDiv.appendChild(patientNameInfoDiv)

        patientDiv.appendChild(patientInfoDiv);

        patientListMainDiv.appendChild(patientDiv);

    })
}

// function addChartDataFunction(data) {
//     console.log("Inside the addChartDataFunction Function ...");
//     console.log(data);

//     const ChartMonthName = []

//     const Y_DirectionValue = data.map((item) => {
//         const diagnosisHistory = item.diagnosis_history;
        
//         // Extract the months and years from each patient's diagnosis history
//         return diagnosisHistory.map((historyItem) => {
//             return historyItem.month ;
//         });
//     });

//     console.log(ChartMonthName);
//     console.log(Y_DirectionValue); 
// }


//Blood Pressure Data Add function Define
function addBloodPressure(data){

    const {diastolic,systolic} = data[4].diagnosis_history[0].blood_pressure;

    const SystolicValue = document.getElementById("SystolicValue");
    SystolicValue.textContent = `${systolic.value}`

    const SystolicLevel = document.getElementById("SystolicLevel");
    SystolicLevel.textContent = `${systolic.levels}`

    const DiastolicValue = document.getElementById("DiastolicValue");
    DiastolicValue.textContent = `${diastolic.value}`

    const DiastolicLevel = document.getElementById("DiastolicLevel");
    DiastolicLevel.textContent = `${diastolic.levels}`
}

// Patient Diagnosis List Data Add function Define
function aaPatientDiagnosisHistory(data) {

    const diagnosisHistory = data[4].diagnosis_history[0]
    const RespiratoryRateValue = document.getElementById("RespiratoryRateValue");
    const RespiratoryRateLevel = document.getElementById("RespiratoryRateLevel");
    RespiratoryRateValue.textContent = `${data[4].diagnosis_history[0].
        respiratory_rate.value  
        }bpm`
        RespiratoryRateLevel.textContent = data[4].diagnosis_history[0].
        respiratory_rate.levels

    const TemperatureValue = document.getElementById("TemperatureValue");
    const TemperatureLevel = document.getElementById("TemperatureLevel");
    TemperatureValue.textContent = `${data[4].diagnosis_history[0].
        temperature.value  
        }F`
        TemperatureLevel.textContent = data[4].diagnosis_history[0].
        temperature.levels

    const HeartRateValue = document.getElementById("HeartRateValue");
    const HeartRateLevel = document.getElementById("HeartRateLevel");
    HeartRateValue.textContent = `${data[4].diagnosis_history[0].
        heart_rate.value  
        }bpm`
        HeartRateLevel.textContent = data[4].diagnosis_history[0].
        heart_rate.levels
}

// Patient Diagnosis List Data Add function Define
function addPatientDiagnosisListData(data) {
    // Access the diagnostic_list directly from the first patient object
    const diagnosticList = data[0].diagnostic_list;

    // Select the first list item as a template for cloning
    const patientDiagnosisListItem = document.querySelector('#patientDiagnosisList li');

    if (patientDiagnosisListItem && Array.isArray(diagnosticList)) {
        // Clear existing items if needed (optional)
        // document.querySelector('#patientDiagnosisList').innerHTML = ''; // Uncomment if you want to clear existing items

        diagnosticList.forEach((DiagnosisListItem) => {
            // Clone the existing list item
            const cloneExistingDiagnosisListItem = patientDiagnosisListItem.cloneNode(true);
            cloneExistingDiagnosisListItem.style.fontSize = '3px'

            // Update the text content with new data using class selectors
            const problemDiagnosisSpan = cloneExistingDiagnosisListItem.querySelector('.problem-diagnosis');
            const descriptionSpan = cloneExistingDiagnosisListItem.querySelector('.description');
            const statusSpan = cloneExistingDiagnosisListItem.querySelector('.status');

            // Set the values from the DiagnosisListItem
            problemDiagnosisSpan.textContent = DiagnosisListItem.name; // Set the problem/diagnosis name
            descriptionSpan.textContent = DiagnosisListItem.description; // Set the description
            statusSpan.textContent = DiagnosisListItem.status; // Set the status

            // Append the cloned item to the patientDiagnosisList
            document.querySelector('#patientDiagnosisList').appendChild(cloneExistingDiagnosisListItem);
        });
    } else {
        console.log('Error: No valid patient diagnosis list or diagnostic list is not an array.');
    }
}


// Personal Patient Data Add function Define
function addPersonalData(data){
    const profilePicture = document.getElementById("profilePicture");
        const PatientName = document.getElementById("patientName");
        const patientDob = document.getElementById("patientDob");
        const patientGender = document.getElementById("patientGender");
        const patientPhoneNo1 = document.getElementById("patientPhoneNo1");
        const patientPhoneNo2 = document.getElementById("patientPhoneNo2");
        const patientInsuranceProvider = document.getElementById("patientInsuranceProvider");

        profilePicture.src = data[3].profile_picture
        PatientName.textContent = data[4].name
        patientDob.textContent = data[4].date_of_birth
        patientGender.textContent = data[4].gender
        patientPhoneNo1.textContent = data[4].phone_number
        patientPhoneNo2.textContent = data[4].phone_number
        patientInsuranceProvider.textContent = data[4].insurance_type
}

// Lab List Data Add function Define
function addLabTextData(data) {
    
    // Ensure we are working with the first patient object
    const patient = data[5]; // Get the first patient object

    // Check if lab_results exists and is an array
    if (patient.lab_results && Array.isArray(patient.lab_results)) {
        // Get the parent <ul> or <ol> where the results will be displayed
        const labResultsList = document.getElementById("labResultLi");
    
        patient.lab_results.forEach((result) => {
            
            // Create a new <li> for each lab result
            const li = document.createElement('li');

            const div = document.createElement('div');
            div.style.display = 'flex';
            div.style.justifyContent = 'space-between';
            div.style.padding = '10px 0';

            const nameDiv = document.createElement('div');

            const nameSpan = document.createElement('span');
            nameSpan.style.fontSize = '12px';
            nameSpan.style.fontWeight = 'bold';
            nameSpan.textContent = result; // Use the result as text content

            nameDiv.appendChild(nameSpan);

            const iconDiv = document.createElement('div');
            const iconSpan = document.createElement('span');
            const icon = document.createElement('i');
            icon.className = 'fa-solid fa-download';
            icon.style.fontSize = '12px';

            iconSpan.appendChild(icon);
            iconDiv.appendChild(iconSpan);

            div.appendChild(nameDiv);
            div.appendChild(iconDiv);

            li.appendChild(div);

            // Append the <li> to the parent <ul>
            labResultsList.appendChild(li); // Append the new list item to the list
        });
    } else {
        console.error('No lab results available for this patient.');
    }
}

