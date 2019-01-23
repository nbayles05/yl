import {waitForKeyElements } from 'https://gist.github.com/raw/2625891/waitForKeyElements.js';
import {faker} from 'https://cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.js';

function setInputValue(selector, value) {
    angular.element(selector).val(value);
    triggerChanged(selector);
}

function triggerChanged(selector) {
    angular.element(selector).triggerHandler('input');
    angular.element(selector).triggerHandler('change');
}

var firstName = faker.name.firstName();
function name (jNode) {
    setInputValue("[name='firstName']", firstName);
    if (Math.floor(Math.random() * 100) % 2 === 0) {
        setInputValue("[name='middleName']", faker.name.firstName());
    }
    setInputValue("[name='lastName']", faker.name.lastName());
}

var addressRun = false;
function address(jNode) {
    if (addressRun == true)
        return;
    addressRun = true;

    setInputValue("#address1", faker.address.streetAddress());

    if (Math.floor(Math.random() * 100) % 2 === 0) {
        setInputValue("#address2", faker.address.secondaryAddress());
    }

    setInputValue("#city", faker.address.city());

    var count = $("#state option").size();
    var idx = Math.floor((Math.random() * count) + 1);
    var stateVal = $("#state option").eq(idx).val();
    //$("#state").val(stateVal).trigger("change");
    setInputValue("#state", stateVal);

    setInputValue("#postalCode", faker.address.zipCode());
}

function contact(jNode) {
    var emailAddress = faker.internet.email();
    setInputValue("[name='email']", emailAddress);
    setInputValue("[name='confirmEmail']", emailAddress);

    setInputValue("[name='primaryPhoneNumber']", faker.phone.phoneNumber("1#########"));
    if (Math.floor(Math.random() * 100) % 2 === 0) {
        setInputValue("[name='secondaryPhoneNumber']", faker.phone.phoneNumber("1#########"));
    }
}

function loginInfo(jNode) {
    setInputValue("[name='userName']", "YL"+Date.now().toString());

    setInputValue("[name='password']", "Pa$$w0rd1");
    setInputValue("[name='confirmPassword']", "Pa$$w0rd1");
    console.log("password=Pa$$w0rd");

    setInputValue("[name='pin']", "1111");
    setInputValue("[name='confirmPin']", "1111");
    console.log("pin=1111");

    angular.element("[name='agreement']").click();
    triggerChanged("[name='agreement']");
}

waitForKeyElements ("[name='firstName']", name);
waitForKeyElements ("#state", address);
waitForKeyElements ("[name='email']", contact);
waitForKeyElements ("[name='userName']", loginInfo);

var taxId = faker.phone.phoneNumber("#########");
waitForKeyElements ("[name='taxId']", jNode => {
    setInputValue("[name='taxId']", taxId);
    setInputValue("[name='taxBusinessName']", firstName + ' ' + taxId + ' LLC.');
});