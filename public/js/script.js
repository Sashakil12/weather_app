const data = document.querySelector('#data')
const loader = document.querySelector('.lds-ellipsis');
const msg1 =    document.querySelector('#msg-1');
const msg2 = document.querySelector('#msg-2');
const msg3 = document.querySelector('#msg-3');
const msg4 = document.querySelector('#msg-4');

loader.style.display = 'none'
data.style.display = 'none'
const form = document.querySelector('form')
const search = document.querySelector('input')
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value;
    const url = '/weather?address='+location; 
    loader.style.display = 'block';
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error;
                msg2.textContent = '';
                msg2.style.display = 'none';
            }else{ 
                msg1.textContent = 'Showing results for: ' +data.placeneme;
                msg2.style.display = 'block';
                msg2.textContent = 'It\'s ' + data.summary;
                msg3.textContent = 'Temperature is '+ data.temperature +' degree celcius';
                if(data.precipType){
                    return msg4.textContent = 'There is a ' + data.precipProbability +'% chance of' + data.precipType;
                }
                msg4.textContent = 'There is a ' + data.precipProbability + '% chance of the weather to change within next 24 hours';

            }
        })
        loader.style.display = 'none';
        data.style.display = 'block';
    });
    
    
    search.value = ''
})