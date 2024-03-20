window.onload = setMinDate();
            function setMinDate(){
                const today = new Date();
                const year = today.getFullYear();
                let month = today.getMonth() + 1;
                let day = today.getDate();
                month = month < 10 ? '0' + month : month;
                day = day < 10 ? '0' + day : day;
                document.getElementById('startDate').min = `${year}-${month}-${day}`;
                document.getElementById('endDate').min = `${year}-${month}-${day}`;
            }
            function changeMinDate(){
                const minDate = new Date(document.getElementById('startDate').value);
                const year = minDate.getFullYear();
                let month = minDate.getMonth() + 1;
                let day = minDate.getDate() + 1;
                month = month < 10 ? '0' + month : month;
                day = day < 10 ? '0' + day : day;
                document.getElementById('endDate').min = `${year}-${month}-${day}`;
            }
            function setMaxDate(){
                const minDate = new Date(document.getElementById('endDate').value);
                const year = minDate.getFullYear();
                let month = minDate.getMonth() + 1;
                let day = minDate.getDate() + 1;
                month = month < 10 ? '0' + month : month;
                day = day < 10 ? '0' + day : day;
                document.getElementById('startDate').max = `${year}-${month}-${day}`;
            }
            document.addEventListener('input', checkValid);
            
            function checkValid(event) {
                var inputElement = event.target;
  
                if (inputElement.tagName === 'INPUT' && inputElement.form) {
                    if (inputElement.id === 'eventName') {
                        var inputValue = inputElement.value.trim();
  
                        if (inputValue === '') {
                            // Blank input: set border color to white
                            inputElement.style.borderBottom = 'calc(5px*var(--scaling-factor)) solid white';
                                              document.getElementById('eventNameLabel').style.display = 'none';
                        } else {
                            var isValid = /^[0-9A-Za-z\s'!?,.]+$/.test(inputValue);
  
                            if (!isValid) {
                                // Invalid input: set border color to red
                                inputElement.style.borderBottom = 'calc(5px*var(--scaling-factor)) solid red';
                                                                                      document.getElementById('eventNameLabel').style.display = 'block';

                                } else {
                                // Valid input: set border color to green
                                inputElement.style.borderBottom = 'calc(5px*var(--scaling-factor)) solid green';
                                                                                      document.getElementById('eventNameLabel').style.display = 'none';

                            }
                        }
                    }

                }
                if (inputElement.tagName === 'INPUT' && inputElement.form) {
                    if (inputElement.id === 'startDate') {
                        var inputValue = inputElement.value.trim();
                        var minDate = new Date(document.getElementById('startDate').min);
                        var maxDate = new Date(document.getElementById('startDate').max);
                        if (inputValue === '') {
                            // Blank input: set border color to white
                            inputElement.style.borderBottom = 'calc(5px*var(--scaling-factor)) solid white';
                                                                                  document.getElementById('startDateLabel').style.display = 'none';
                        } else {
                            var isValid = /^\d{4}-\d{2}-\d{2}$/.test(inputValue);
                            if(new Date(document.getElementById('startDate').value) < minDate){
                                inputElement.style.borderBottom = 'calc(5px*var(--scaling-factor)) solid red';
                                        document.getElementById('startDateLabel').style.display = 'block';
                            }
                            if(new Date(document.getElementById('startDate').value) > maxDate){
                                inputElement.style.borderBottom = 'calc(5px*var(--scaling-factor)) solid red';
                                        document.getElementById('startDateLabel').style.display = 'block';
                            }
  
                            if (!isValid) {
                                // Invalid input: set border color to red
                                inputElement.style.borderBottom = 'calc(5px*var(--scaling-factor)) solid red';
                                        document.getElementById('startDateLabel').style.display = 'block';
                                } else {
                                // Valid input: set border color to green
                                inputElement.style.borderBottom = 'calc(5px*var(--scaling-factor)) solid green';
                                        document.getElementById('startDateLabel').style.display = 'none';
                            }
                        }
                    }

                }
                if (inputElement.tagName === 'INPUT' && inputElement.form) {
                    if (inputElement.id === 'endDate') {
                        var inputValue = inputElement.value.trim();
                        var minDate = new Date(document.getElementById('endDate').min);
                        if (inputValue === '') {
                            // Blank input: set border color to white
                            inputElement.style.borderBottom = 'calc(5px*var(--scaling-factor)) solid white';
                                                                                  document.getElementById('endDateLabel').style.display = 'none';
                        } else {
                            var isValid = /^\d{4}-\d{2}-\d{2}$/.test(inputValue);
                            if(new Date(document.getElementById('endDate').value) < minDate){
                                inputElement.style.borderBottom = 'calc(5px*var(--scaling-factor)) solid red';
                                        document.getElementById('endDateLabel').style.display = 'block';
                            }
  
                            if (!isValid) {
                                // Invalid input: set border color to red
                                inputElement.style.borderBottom = 'calc(5px*var(--scaling-factor)) solid red';
                                        document.getElementById('endDateLabel').style.display = 'block';
                                } else {
                                // Valid input: set border color to green
                                inputElement.style.borderBottom = 'calc(5px*var(--scaling-factor)) solid green';
                                        document.getElementById('endDateLabel').style.display = 'none';
                            }
                        }
                    }

                }
                if (inputElement.tagName === 'INPUT' && inputElement.form) {
                    if (inputElement.id === 'time') {
                        var inputValue = inputElement.value.trim();
  
                        if (inputValue === '') {
                            // Blank input: set border color to white
                            inputElement.style.borderBottom = 'calc(5px*var(--scaling-factor)) solid white';
                                                                                  document.getElementById('timeLabel').style.display = 'none';
                        } else {
                            var isValid = /^[0-9]{2}:[0-9]{2}$/.test(inputValue);
  
                            if (!isValid) {
                                // Invalid input: set border color to red
                                inputElement.style.borderBottom = 'calc(5px*var(--scaling-factor)) solid red';
                                        document.getElementById('timeLabel').style.display = 'block';
                                } else {
                                // Valid input: set border color to green
                                inputElement.style.borderBottom = 'calc(5px*var(--scaling-factor)) solid green';
                                        document.getElementById('timeLabel').style.display = 'none';
                            }
                        }
                    }

                }
                if (inputElement.tagName === 'INPUT' && inputElement.form) {
                    if (inputElement.id === 'location') {
                        var inputValue = inputElement.value.trim();
  
                        if (inputValue === '') {
                            // Blank input: set border color to white
                            inputElement.style.borderBottom = 'calc(5px*var(--scaling-factor)) solid white';
                                                                                  document.getElementById('locationLabel').style.display = 'none';
                        } else {
                            var isValid = /^[0-9A-Za-z\s'!?,.]+$/.test(inputValue);
  
                            if (!isValid) {
                                // Invalid input: set border color to red
                                inputElement.style.borderBottom = 'calc(5px*var(--scaling-factor)) solid red';
                                        document.getElementById('locationLabel').style.display = 'block';
                                } else {
                                // Valid input: set border color to green
                                inputElement.style.borderBottom = 'calc(5px*var(--scaling-factor)) solid green';
                                        document.getElementById('locationLabel').style.display = 'none';
                            }
                        }
                    }

                }
                if (inputElement.tagName === 'INPUT' && inputElement.form) {
                    if (inputElement.id === 'capacity') {
                        var inputValue = inputElement.value.trim();
  
                        if (inputValue === '') {
                            // Blank input: set border color to white
                            inputElement.style.borderBottom = 'calc(5px*var(--scaling-factor)) solid white';
                                                                                  document.getElementById('capacityLabel').style.display = 'none';
                        } else {
                            var isValid = /^\d{1,}$/.test(inputValue);
  
                            if (!isValid) {
                                // Invalid input: set border color to red
                                inputElement.style.borderBottom = 'calc(5px*var(--scaling-factor)) solid red';
                                        document.getElementById('capacityLabel').style.display = 'block';
                                        
                                } else {
                                // Valid input: set border color to green
                                inputElement.style.borderBottom = 'calc(5px*var(--scaling-factor)) solid green';
                                        document.getElementById('capacityLabel').style.display = 'none';
                            }
                        }
                    }

                }
                if (inputElement.tagName === 'TEXTAREA' && inputElement.form) {
                    if (inputElement.id === 'description') {
                        var inputValue = inputElement.value.trim();
  
                        if (inputValue === '') {
                            // Blank input: set border color to white
                            inputElement.style.borderBottom = 'calc(5px*var(--scaling-factor)) solid red';
                                                document.getElementById('descriptionLabel').style.display = 'block';
                        } else {
                            inputElement.style.borderBottom = 'calc(5px*var(--scaling-factor)) solid green';
                                                                                  document.getElementById('descriptionLabel').style.display = 'none';
                        }
                    }

                }
            }


            document.getElementById('myForm').addEventListener('submit', function(event){
                event.preventDefault();

                var inputs = document.getElementById('myForm').querySelectorAll('input, textarea');
                for(var i = 0; i < inputs.length; i++){
                if(window.getComputedStyle(inputs[i]).getPropertyValue('border-bottom-color') === 'red'){
                  event.preventDefault();
                  alert("Please make changes to red fields.");
                  return;
                }
              }

                const formData = {
                        eventId: Math.random().toString(16).slice(2),
                    eventName: document.getElementById('eventName').value,
                    startDate: document.getElementById('startDate').value,
                    endDate: document.getElementById('endDate').value,
                    time: document.getElementById('time').value,
                    location: document.getElementById('location').value,
                    capcity: document.getElementById('capacity').value,
                    description: document.getElementById('description').value
                };
                fetch('https://vast-wave-12355-e83778ef23ea.herokuapp.com/event-submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then(response => response.text())
            .then(data => {
                console.log('Success:', data);
                alert('Data submitted successfully!');
                document.location.href = "/VW/admin/manage-events.html";
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Error submitting data');
            });
        });

            
