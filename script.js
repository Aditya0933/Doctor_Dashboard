async function fetchPatientPersonalInfo(result) {
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

        //Personal Patient Data Add function Call
        addPersonalData(data);

        //Lab Test Data Add function Call
        addLabTextData(data)

        // addPatientDiagnosisHistoryData(data);
        aaPatientDiagnosisHistory(data);
        

    } catch (error) {
        console.error('Error fetching patient data:', error);
        alert('Failed to load patient information.');
    }
}

fetchPatientPersonalInfo();

//Patient List Data Add function Define
function addPatientListData(data){
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

        // Add click event listener to each patientDiv to Update the UI...
        patientDiv.addEventListener('click', () => {


            //Patient List Data Add function Update
            addPersonalData(result);

            //Lab Test Data Add function Update
            addLabTextData(result);

            //PatientDiagnosisHistory Data Add function Update
            aaPatientDiagnosisHistory(result);

            //Patient Diagnosis History Data Add function
            addPatientDiagnosisListData(result);

            //Chart Data Function
            addChartDataFunction(result);

            // Blood Pressure Data Add Function
            addBloodPressure(result);
        });

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

function addBloodPressure(data) {
    const clickedData = data;
    
    // Check if clickedData and its diagnosis_history exist, otherwise fall back to data[0]
    if (clickedData && clickedData.diagnosis_history && clickedData.diagnosis_history.length > 0) {
        const { diastolic, systolic } = clickedData.diagnosis_history[0].blood_pressure;

        // Update Systolic Value
        const SystolicValue = document.getElementById("SystolicValue");
        SystolicValue.textContent = systolic?.value || "N/A";  // Ensure systolic.value exists

        // Update Systolic Level
        const SystolicLevel = document.getElementById("SystolicLevel");
        SystolicLevel.textContent = systolic?.levels || "N/A";  // Ensure systolic.levels exists

        // Update Diastolic Value
        const DiastolicValue = document.getElementById("DiastolicValue");
        DiastolicValue.textContent = diastolic?.value || "N/A";  // Ensure diastolic.value exists

        // Update Diastolic Level
        const DiastolicLevel = document.getElementById("DiastolicLevel");
        DiastolicLevel.textContent = diastolic?.levels || "N/A";  // Ensure diastolic.levels exists
    } else if (data[0] && data[0].diagnosis_history && data[0].diagnosis_history.length > 0) {
        // Fallback to data[0] if clickedData is not available
        const { diastolic, systolic } = data[0].diagnosis_history[0].blood_pressure;

        // Update Systolic Value
        const SystolicValue = document.getElementById("SystolicValue");
        SystolicValue.textContent = systolic?.value || "N/A";  // Ensure systolic.value exists

        // Update Systolic Level
        const SystolicLevel = document.getElementById("SystolicLevel");
        SystolicLevel.textContent = systolic?.levels || "N/A";  // Ensure systolic.levels exists

        // Update Diastolic Value
        const DiastolicValue = document.getElementById("DiastolicValue");
        DiastolicValue.textContent = diastolic?.value || "N/A";  // Ensure diastolic.value exists

        // Update Diastolic Level
        const DiastolicLevel = document.getElementById("DiastolicLevel");
        DiastolicLevel.textContent = diastolic?.levels || "N/A";  // Ensure diastolic.levels exists
    } else {
        console.warn("No valid diagnosis history found.");
    }
}


// Patient Diagnosis List Data Add function Define
function aaPatientDiagnosisHistory(data) {
    const diagnosisHis = data;

    // Safely access the first diagnosis_history item
    const diagnosisHistory = diagnosisHis.diagnosis_history ? diagnosisHis.diagnosis_history[0] : diagnosisHis[0].diagnosis_history[0];

    if (diagnosisHistory) {
        // Updating Respiratory Rate
        const RespiratoryRateValue = document.getElementById("RespiratoryRateValue");
        const RespiratoryRateLevel = document.getElementById("RespiratoryRateLevel");
        RespiratoryRateValue.textContent = `${diagnosisHistory.respiratory_rate.value} bpm`;
        RespiratoryRateLevel.textContent = diagnosisHistory.respiratory_rate.levels;

        // Updating Temperature
        const TemperatureValue = document.getElementById("TemperatureValue");
        const TemperatureLevel = document.getElementById("TemperatureLevel");
        TemperatureValue.textContent = `${diagnosisHistory.temperature.value} F`;
        TemperatureLevel.textContent = diagnosisHistory.temperature.levels;

        // Updating Heart Rate
        const HeartRateValue = document.getElementById("HeartRateValue");
        const HeartRateLevel = document.getElementById("HeartRateLevel");
        HeartRateValue.textContent = `${diagnosisHistory.heart_rate.value} bpm`;
        HeartRateLevel.textContent = diagnosisHistory.heart_rate.levels;
    } else {
        console.error("No diagnosis history available for this patient.");
    }
}


// Patient Diagnosis List Data Add function Define
function addPatientDiagnosisListData(data) {
    // Access the diagnostic_list directly from the patient object (handling both single patient and array cases)
    const diagnosticList = data.diagnostic_list || data[0]?.diagnostic_list;

    // Select the first list item template for cloning (from the UL)
    const patientDiagnosisListItem = document.querySelector('#patientDiagnosisListUl li');

    if (patientDiagnosisListItem && Array.isArray(diagnosticList)) {
        // Clear existing items in the list (reset for new data)
        document.querySelector('#patientDiagnosisListUl').innerHTML = '';

        diagnosticList.forEach((DiagnosisListItem) => {
            // Clone the <li> item
            const cloneExistingDiagnosisListItem = patientDiagnosisListItem.cloneNode(true);

            // Update the text content with new data using class selectors
            const problemDiagnosisFirst = cloneExistingDiagnosisListItem.querySelector('.problem-diagnosis-first');
            const problemDiagnosisSpan = cloneExistingDiagnosisListItem.querySelector('.problem-diagnosis');
            const descriptionSpan = cloneExistingDiagnosisListItem.querySelector('.description');
            const statusSpan = cloneExistingDiagnosisListItem.querySelector('.status');

            // Set the values from the DiagnosisListItem
            problemDiagnosisFirst.style.padding = '8px 16px'; // Set the problem/diagnosis name
            problemDiagnosisSpan.textContent = DiagnosisListItem.name; // Set the problem/diagnosis name
            descriptionSpan.textContent = DiagnosisListItem.description; // Set the description
            statusSpan.textContent = DiagnosisListItem.status; // Set the status

            // Set font sizes (as per your requirement)
            problemDiagnosisSpan.style.fontSize = "14px";
            descriptionSpan.style.fontSize = "12px";
            statusSpan.style.fontSize = "14px";

            // Append the cloned item to the UL
            document.querySelector('#patientDiagnosisListUl').appendChild(cloneExistingDiagnosisListItem);
        });
    } else {
        console.log('Error: No valid patient diagnosis list or diagnostic list is not an array.');
    }
}




// Personal Patient Data Add function Define
function addPersonalData(data) {
    const profilePicture = document.getElementById("profilePicture");
    const patientName = document.getElementById("patientName");
    const patientDob = document.getElementById("patientDob");
    const patientGender = document.getElementById("patientGender");
    const patientPhoneNo1 = document.getElementById("patientPhoneNo1");
    const patientPhoneNo2 = document.getElementById("patientPhoneNo2");
    const patientInsuranceProvider = document.getElementById("patientInsuranceProvider");

    // Using nullish coalescing operator (??) to provide a fallback value
    profilePicture.src = (data[0] && data[0].profile_picture) || (data.profile_picture || 'default_image.png'); // Provide a default image if none exists
    patientName.textContent = (data[0] && data[0].name) || (data.name || 'N/A');
    patientDob.textContent = (data[0] && data[0].date_of_birth) || (data.date_of_birth || 'N/A');
    patientGender.textContent = (data[0] && data[0].gender) || (data.gender || 'N/A');
    patientPhoneNo1.textContent = (data[0] && data[0].phone_number) || (data.phone_number || 'N/A');
    patientPhoneNo2.textContent = (data[0] && data[0].phone_number) || (data.phone_number || 'N/A'); // Assuming you want to show the same phone number
    patientInsuranceProvider.textContent = (data[0] && data[0].insurance_type) || (data.insurance_type || 'N/A');
}


// Lab List Data Add function Define
function addLabTextData(data) {
    // Ensure we are working with the first patient object
    const patient = data[0] || data; // Get the first patient object

    // Check if lab_results exists and is an array
    if (patient.lab_results && Array.isArray(patient.lab_results)) {
        // Get the parent <ul> or <ol> where the results will be displayed
        const labResultsList = document.getElementById("labResultLi");

        labResultsList.innerHTML = ''; // Clear previous lab results

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
            nameSpan.textContent = result; // Assuming result is an object with a name property

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


