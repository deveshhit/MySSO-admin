import React, { useState, useEffect } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'

import profile from "../../../assets/profile.png"
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from "react-phone-number-input";
import flags from 'react-phone-number-input/flags'
import en from 'react-phone-number-input/locale/en';
import 'react-phone-number-input/style.css'
import API_URL from '../../../config';


const MatrimonyUserdetail = () => {

    const Navigate = useNavigate();

    const [maritalStatusList, setMaritalStatusList] = useState([]);
    const [NationalityList, setNationalityList] = useState([]);
    const [MotherTongueList, setMotherTongueList] = useState([]);
    const [LanguageList, setLanguageList] = useState([]);
    const [casteList, setCasteList] = useState([]);
    const [subCasteList, setSubCasteList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [permanentStateList, setPermanentStateList] = useState([]);
    const [permanentCityList, setPermanentCityList] = useState([]);
    const [genderList, setGenderList] = useState([]);

    //personal information
    const [whoAmI, setWhoAmI] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [age, setAge] = useState('');
    const [marital_status, setMarital_status] = useState('');
    const [nationality, setNationality] = useState('');
    const [mother_tongue, setMother_tongue] = useState('');
    const [language_known, setLanguage_known] = useState('');
    const [cast_id, setCast_id] = useState('');
    const [sub_caste, setSub_caste] = useState('');
    const [gotra, setGotra] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [info_about_me, setInfo_about_me] = useState('');
    const [hobbies, setHobbies] = useState('');
    const [phone_number, setPhone_number] = useState('');
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [WhatsApp_number, setWhatsApp_number] = useState('');
    const [facebook_link, setFacebook_link] = useState('');
    const [instagram_link, setInstagram_link] = useState('');
    const [linkedin_link, setLinkedin_link] = useState('');
    const [handicap, setHandicap] = useState('');
    //present address
    const [country_id, setCountry_id] = useState('');
    const [state_id, setState_id] = useState('');
    const [city_id, setCity_id] = useState('');
    //permanent address
    const [permanent_country_id, setPermanent_country_id] = useState('');
    const [permanent_state_id, setPermanent_state_id] = useState('');
    const [permanent_city_id, setPermanent_city_id] = useState('');

    //education information
    const [educationEntries, setEducationEntries] = useState([{ degree: '', institution: '', year_of_passing: '' }]);
    //career information
    const [careers, setCareers] = useState([{ occupation: '', company: '', income: '' }]);

    //family information
    const [fatherName, setFatherName] = useState('');
    const [fatherOccupation, setFatherOccupation] = useState('');
    const [fatherEducation, setFatherEducation] = useState('');
    const [motherName, setMotherName] = useState('');
    const [motherOccupation, setMotherOccupation] = useState('');
    const [motherEducation, setMotherEducation] = useState('');

    //sibling information
    const [siblings, setSiblings] = useState([{ siblingName: '', siblingMaritalStatus: '', siblingEducation: '' }]);
    //profile image
    const [image, setImage] = useState(profile);
    const [profile_pic, setProfile_pic] = useState([]);

    //astrological information
    const [timeOfBirth, setTimeOfBirth] = useState('');
    const [cityOfBirth, setCityOfBirth] = useState('');
    const [mangalDosh, setMangalDosh] = useState('');
    const [shanidosh, setShanidosh] = useState('');

    //life style
    const [fitnessFreak, setFitnessFreak] = useState('');
    const [moreResponsibilities, setMoreResponsibilities] = useState('');
    const [likeCooking, setLikeCooking] = useState('');
    const [likeTraveling, setLikeTraveling] = useState('');
    const [partnerWorking, setPartnerWorking] = useState('');
    const [spirituallyStrong, setSpirituallyStrong] = useState('');

    //satsang information
    const [nityaPoojaDaily, setNityaPoojaDaily] = useState('');
    const [sansthaName, setSansthaName] = useState('');
    const [mandalName, setMandalName] = useState('');
    const [sampradayaFast, setSampradayaFast] = useState('');
    const [templeVisit, setTempleVisit] = useState('');
    const [eatOnionGarlic, setEatOnionGarlic] = useState('');
    const [aarti, setAarti] = useState('');
    const [wearKanthi, setWearKanthi] = useState('');
    const [volunteerActivities, setVolunteerActivities] = useState('');
    const [define, setDefine] = useState('');
    const [tilakChandlo, setTilakChandlo] = useState('');
    const [shibir, setShibir] = useState('');
    const [photos, setPhotos] = useState([]);
    const [previewPhotos, setPreviewPhotos] = useState([]);
    const [id, setId] = useState('');
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getMaritalstatus();
        getNationality();
        getMothertongue();
        getLanguage();
        getCaste();
        // getSubCaste();
        // getState();
        // getCity();
        usergender();
    }, []);

    useEffect(() => {
        getState();
    }, [country_id]);

    useEffect(() => {
        getCity();
    }, [state_id]);

    useEffect(() => {
        getPermanentState();
    }, [permanent_country_id]);

    useEffect(() => {
        getPermanentCity();
    }, [permanent_state_id]);

    useEffect(() => {
        getSubCaste();
    }, [cast_id]);


    const handleEducationChange = (index, field, value) => {
        const newEducationEntries = educationEntries.map((educationEntries, i) =>
            i === index ? { ...educationEntries, [field]: value } : educationEntries

        );
        setEducationEntries(newEducationEntries);
    };

    const addEducationEntry = () => {
        setEducationEntries([...educationEntries, { degree: '', institution: '', year_of_passing: '' }]);
    };

    const removeEducationEntry = (index) => {
        const newEducationEntries = educationEntries.filter((_, i) => i !== index);
        setEducationEntries(newEducationEntries);
    };






    const handleCareerChange = (index, field, value) => {
        const newCareers = careers.map((career, i) =>
            i === index ? { ...career, [field]: value } : career
        );
        setCareers(newCareers);
    };

    const addCareer = () => {
        setCareers([...careers, { occupation: '', company: '', income: '' }]);
    };

    const removeCareer = (index) => {
        const newCareers = careers.filter((_, i) => i !== index);
        setCareers(newCareers);
    };

    const handleSiblingChange = (index, field, value) => {
        const newSiblings = siblings.map((sibling, i) =>
            i === index ? { ...sibling, [field]: value } : sibling
        );
        setSiblings(newSiblings);
    };

    const addSibling = () => {
        setSiblings([...siblings, { siblingName: '', siblingMaritalStatus: '', siblingEducation: '' }]);
    };

    const removeSibling = (index) => {
        const newSiblings = siblings.filter((_, i) => i !== index);
        setSiblings(newSiblings);
    };

    const getMaritalstatus = async () => {
        try {
            const requestoptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            await fetch(`${API_URL}/api/maritalStatusList`, requestoptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data.data);
                    setMaritalStatusList(data.data);
                })
        } catch (err) {
            console.error(err.message);
        }
    }

    const getNationality = async () => {
        try {
            const requestoptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            await fetch(`${API_URL}/api/countryList`, requestoptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data.data);
                    setNationalityList(data.data);
                })
        }
        catch (err) {
            console.error(err.message);
        }
    }

    const getMothertongue = async () => {
        try {
            const requestoptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            await fetch(`${API_URL}/api/motherTongueList`, requestoptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data.data);
                    setMotherTongueList(data.data);
                })
        }
        catch (err) {
            console.error(err.message);
        }
    }

    const getLanguage = async () => {
        try {
            const requestoptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            await fetch(`${API_URL}/api/languageList`, requestoptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data.data);
                    setLanguageList(data.data);
                })
        }
        catch (err) {
            console.error(err.message);
        }
    }


    const getCaste = async () => {
        try {
            const requestoptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            await fetch(`${API_URL}/api/castList`, requestoptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data.data);
                    setCasteList(data.data);
                })
        }
        catch (err) {
            console.error(err.message);
        }
    }

    const getSubCaste = async () => {
        try {
            const requestoptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            await fetch(`${API_URL}/api/getSubcastbycastid?cast_id=${cast_id}`, requestoptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data.data);
                    setSubCasteList(data.data);
                })
        }
        catch (err) {
            console.error(err.message);
        }
    }

    const getState = async () => {
        try {
            // const countryid = country_id ? country_id : profiledata?.presentAddress?.present_country;
            const requestoptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            await fetch(`${API_URL}/api/getstatebycountry?country_id=${country_id}`, requestoptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data.data);
                    setStateList(data.data);
                })
        }
        catch (err) {
            console.error(err.message);
        }
    }

    const getCity = async () => {
        try {
            // const stateid = state_id ? state_id : profiledata?.presentAddress?.present_state;
            const requestoptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            await fetch(`${API_URL}/api/getcitybystate?state_id=${state_id}`, requestoptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data.data);
                    setCityList(data.data);
                })
        }
        catch (err) {
            console.error(err.message);
        }
    }

    const getPermanentState = async () => {
        try {
            const requestoptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            await fetch(`${API_URL}/api/getstatebycountry?country_id=${permanent_country_id}`, requestoptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data.data);
                    setPermanentStateList(data.data);
                })
        }
        catch (err) {
            console.error(err.message);
        }
    }

    const getPermanentCity = async () => {
        try {
            const requestoptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
            await fetch(`${API_URL}/api/getcitybystate?state_id=${permanent_state_id}`, requestoptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data.data);
                    setPermanentCityList(data.data);
                })
        }
        catch (err) {
            console.error(err.message);
        }
    }

    const handleImageChange = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];
        setProfile_pic(file);
        reader.onloadend = () => {
            setImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        const url = window.location.href;
        const url1 = url.split("/")[3];
        const url2 = url1.split("?")[1];
        const id = url2.split("=")[1];
        getProfiledata(id)
    }, [])

    const [profiledata, setProfiledata] = useState([])


    const getProfiledata = async (id) => {
        try {
            setLoading(true)
            const requestOption = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            await fetch(`${API_URL}/api/getMatrimonyUserDataById?id=${id}`, requestOption)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    const { data: profile } = data;
                    setProfiledata(profile)
                    setId(profile._id)
                    setFirst_name(profile.firstName)
                    setLast_name(profile.lastName)
                    setGender(profile.gender)
                    setDob(profile.dateOfBirth)
                    setAge(profile.age)
                    setMarital_status(profile.maritalStatus)
                    setNationality(profile.nationality)
                    setMother_tongue(profile.motherTongue)
                    setLanguage_known(profile.languagesKnown)
                    setCast_id(profile.caste)
                    setSub_caste(profile.subCaste)
                    setGotra(profile.gotra)
                    setHeight(profile.height)
                    setWeight(profile.weight)
                    setInfo_about_me(profile.infoAboutMe)
                    setHobbies(profile.hobbies)
                    setPhone_number(profile.phoneNumber)
                    setWhatsApp_number(profile.socialMedia.whatsappNumber)
                    setFacebook_link(profile.facebookLink)
                    setInstagram_link(profile.instagramLink)
                    setLinkedin_link(profile.linkedinLink)
                    setHandicap(profile.handicap)
                    setCountry_id(profile.presentAddress.present_country)
                    setState_id(profile.presentAddress.present_state)
                    setCity_id(profile.presentAddress.present_city)
                    setPermanent_country_id(profile.permanentAddress.permanent_country)
                    setPermanent_state_id(profile.permanentAddress.permanent_state)
                    setPermanent_city_id(profile.permanentAddress.permanent_city)
                    setEducationEntries(profile.education)
                    setCareers(profile.career)
                    setFatherName(profile.father.father_name)
                    setFatherOccupation(profile.father.father_occupation)
                    setFatherEducation(profile.father.father_education)
                    setMotherName(profile.mother.mother_name)
                    setMotherOccupation(profile.mother.mother_occupation)
                    setMotherEducation(profile.mother.mother_education)
                    setSiblings(profile.siblings)
                    setTimeOfBirth(profile.astroDetails.timeOfBirth)
                    setCityOfBirth(profile.astroDetails.cityOfBirth)
                    setMangalDosh(profile.astroDetails.mangalDosh)
                    setShanidosh(profile.astroDetails.shanidosh)
                    setFitnessFreak(profile.lifeStyle.fitnessFreak)
                    setMoreResponsibilities(profile.lifeStyle.moreResponsibilities)
                    setLikeCooking(profile.lifeStyle.likeCooking)
                    setLikeTraveling(profile.lifeStyle.likeTraveling)
                    setPartnerWorking(profile.lifeStyle.partnerWorking)
                    setSpirituallyStrong(profile.lifeStyle.spirituallyStrong)
                    setNityaPoojaDaily(profile.satsang.nityaPoojaDaily)
                    setSansthaName(profile.satsang.sansthaName)
                    setMandalName(profile.satsang.mandalName)
                    setSampradayaFast(profile.satsang.sampradayaFast)
                    setTempleVisit(profile.satsang.templeVisit)
                    setEatOnionGarlic(profile.satsang.eatOnionGarlic)
                    setAarti(profile.satsang.aarti)
                    setWearKanthi(profile.satsang.wearKanthi)
                    setVolunteerActivities(profile.satsang.volunteerActivities)
                    setDefine(profile.satsang.define)
                    setTilakChandlo(profile.satsang.tilakChandlo)
                    setShibir(profile.satsang.shibir)
                    setPhotos(profile.photos)
                    setPreviewPhotos(profile.photos)
                    setProfile_pic(profile.profilePic[0])
                    setLoading(false)

                })
        } catch (error) {
            console.log(error)
        }

    }

    console.log(profile_pic)


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // if (!whoAmI) {
            //     swal({
            //         text: "Please select who am I",
            //         icon: "warning",
            //     });
            //     return;
            // }
            // else
            if (profile_pic.length == 0) {
                swal({
                    text: "Please upload profile picture",
                    icon: "warning",
                });
                return;
            }
            else if (!first_name) {
                swal({
                    text: "Please enter first name",
                    icon: "warning",
                });
                return;
            }
            else if (!last_name) {
                swal({
                    text: "Please enter last name",
                    icon: "warning",
                });
                return;
            }
            else if (!gender) {
                swal({
                    text: "Please select Gender",
                    icon: "warning",
                });
                return;
            }
            else if (!dob) {
                swal({
                    text: "Please enter date of birth",
                    icon: "warning",
                });
                return;
            }
            else if (!age) {
                swal({
                    text: "Please enter age",
                    icon: "warning",
                });
                return;
            }
            else if (!marital_status) {
                swal({
                    text: "Please select marital status",
                    icon: "warning",
                });
                return;
            }
            else if (!nationality) {
                swal({
                    text: "Please select nationality",
                    icon: "warning",
                });
                return;
            }
            else if (!mother_tongue) {
                swal({
                    text: "Please select mother tongue",
                    icon: "warning",
                });
                return;
            }
            else if (!language_known) {
                swal({
                    text: "Please select language known",
                    icon: "warning",
                });
                return;
            }
            else if (!cast_id) {
                swal({
                    text: "Please select caste",
                    icon: "warning",
                });
                return;
            }
            else if (!sub_caste) {
                swal({
                    text: "Please select sub caste",
                    icon: "warning",
                });
                return;
            }
            else if (!gotra) {
                swal({
                    text: "Please enter gotra",
                    icon: "warning",
                });
                return;
            }
            else if (!height) {
                swal({
                    text: "Please enter height",
                    icon: "warning",
                });
                return;
            }
            else if (!weight) {
                swal({
                    text: "Please enter weight",
                    icon: "warning",
                });
                return;
            }
            else if (!info_about_me) {
                swal({
                    text: "Please enter info about me",
                    icon: "warning",
                });
                return;
            }
            else if (!hobbies) {
                swal({
                    text: "Please enter hobbies",
                    icon: "warning",
                });
                return;
            }
            else if (!phone_number) {
                swal({
                    text: "Please enter Mobile number",
                    icon: "warning",
                });

                return;
            }
            else if (!isPhoneValid) {
                swal({
                    text: "Please enter valid Mobile number",
                    icon: "warning",
                });

                return;
            }
            else if (!country_id) {
                swal({
                    text: "Please select country",
                    icon: "warning",
                });
                return;
            }
            else if (!state_id) {
                swal({
                    text: "Please select state",
                    icon: "warning",
                });
                return;
            }
            else if (!city_id) {
                swal({
                    text: "Please select city",
                    icon: "warning",
                });
                return;
            }
            else if (!permanent_country_id) {
                swal({
                    text: "Please select permanent country",
                    icon: "warning",
                });
                return;
            }
            else if (!permanent_state_id) {
                swal({
                    text: "Please select permanent state",
                    icon: "warning",
                });
                return;
            }
            else if (!permanent_city_id) {
                swal({
                    text: "Please select permanent city",
                    icon: "warning",
                });
                return;
            }
            else if (educationEntries.length == 0) {
                swal({
                    text: "Please enter education details",
                    icon: "warning",
                });
                return;
            }
            else if (careers.length == 0) {
                swal({
                    text: "Please enter career details",
                    icon: "warning",
                });
                return;
            }
            else if (siblings.length == 0) {
                swal({
                    text: "Please enter sibling details",
                    icon: "warning",
                });
                return;
            }
            else if (!timeOfBirth) {
                swal({
                    text: "Please enter time of birth",
                    icon: "warning",
                });
                return;
            }
            else if (!cityOfBirth) {
                swal({
                    text: "Please enter city of birth",
                    icon: "warning",
                });
                return;
            }
            else if (!mangalDosh) {
                swal({
                    text: "Please enter mangal dosh",
                    icon: "warning",
                });
                return;
            }
            else if (!shanidosh) {
                swal({
                    text: "Please enter shani dosh",
                    icon: "warning",
                });
                return;
            }
            else if (!fitnessFreak) {
                swal({
                    text: "Please enter fitness freak",
                    icon: "warning",
                });
                return;
            }
            else if (!moreResponsibilities) {
                swal({
                    text: "Please enter more responsibilities",
                    icon: "warning",
                });
                return;
            }
            else if (!likeCooking) {
                swal({
                    text: "Please enter like cooking",
                    icon: "warning",
                });
                return;
            }
            else if (!likeTraveling) {
                swal({
                    text: "Please enter like traveling",
                    icon: "warning",
                });
                return;
            }
            else if (!partnerWorking) {
                swal({
                    text: "Please enter partner working",
                    icon: "warning",
                });
                return;
            }
            else if (!spirituallyStrong) {
                swal({
                    text: "Please enter spiritually strong",
                    icon: "warning",
                });
                return;
            }
            else if (!nityaPoojaDaily) {
                swal({
                    text: "Please enter nitya pooja daily",
                    icon: "warning",
                });
                return;
            }
            else if (!sansthaName) {
                swal({
                    text: "Please enter sanstha name",
                    icon: "warning",
                });
                return;
            }
            else if (!mandalName) {
                swal({
                    text: "Please enter mandal name",
                    icon: "warning",
                });
                return;
            }
            else if (!sampradayaFast) {
                swal({
                    text: "Please enter sampradaya fast",
                    icon: "warning",
                });
                return;
            }
            else if (!templeVisit) {
                swal({
                    text: "Please enter temple visit",
                    icon: "warning",
                });
                return;
            }
            else if (!eatOnionGarlic) {
                swal({
                    text: "Please enter eat onion garlic",
                    icon: "warning",
                });
                return;
            }
            else if (!aarti) {
                swal({
                    text: "Please enter aarti",
                    icon: "warning",
                });
                return;
            }
            else if (!wearKanthi) {
                swal({
                    text: "Please enter wear kanthi",
                    icon: "warning",
                });
                return;
            }
            else if (!volunteerActivities) {
                swal({
                    text: "Please enter volunteer activities",
                    icon: "warning",
                });
                return;
            }
            else if (!define) {
                swal({
                    text: "Please enter define",
                    icon: "warning",
                });
                return;
            }
            else if (!tilakChandlo) {
                swal({
                    text: "Please enter tilak chandlo",
                    icon: "warning",
                });
                return;
            }
            else if (!shibir) {
                swal({
                    text: "Please enter shibir",
                    icon: "warning",
                });
                return;
            }
            else if (photos.length == 0) {
                swal({
                    text: "Please upload photos",
                    icon: "warning",
                });
                return;
            }

            const formdata = new FormData();
            // formdata.append('whoAmI', whoAmI);
            formdata.append('id', id);
            formdata.append('profile', profile_pic);
            formdata.append('firstName', first_name);
            formdata.append('lastName', last_name);
            formdata.append('gender', gender);
            formdata.append('dateOfBirth', dob);
            formdata.append('age', age);
            formdata.append('maritalStatus', marital_status);
            formdata.append('nationality', nationality);
            formdata.append('motherTongue', mother_tongue);
            formdata.append('languagesKnown', language_known);
            formdata.append('caste', cast_id);
            formdata.append('subCaste', sub_caste);
            formdata.append('gotra', gotra);
            formdata.append('height', height);
            formdata.append('weight', weight);
            formdata.append('infoAboutMe', info_about_me);
            formdata.append('hobbies', hobbies);
            formdata.append('phoneNumber', phone_number);
            formdata.append('whatsappNumber', WhatsApp_number);
            formdata.append('facebookLink', facebook_link);
            formdata.append('instagramLink', instagram_link);
            formdata.append('linkedinLink', linkedin_link);
            formdata.append('handicap', handicap);
            formdata.append('present_country', country_id);
            formdata.append('present_state', state_id);
            formdata.append('present_city', city_id);
            formdata.append('permanent_country', permanent_country_id);
            formdata.append('permanent_state', permanent_state_id);
            formdata.append('permanent_city', permanent_city_id);
            formdata.append('career', JSON.stringify(careers));
            formdata.append('father_name', fatherName);
            formdata.append('father_occupation', fatherOccupation);
            formdata.append('father_education', fatherEducation);
            formdata.append('mother_name', motherName);
            formdata.append('mother_occupation', motherOccupation);
            formdata.append('mother_education', motherEducation);
            formdata.append('siblings', JSON.stringify(siblings));
            formdata.append('education', JSON.stringify(educationEntries));
            formdata.append('timeOfBirth', timeOfBirth);
            formdata.append('cityOfBirth', cityOfBirth);
            formdata.append('mangalDosh', mangalDosh);
            formdata.append('shanidosh', shanidosh);
            formdata.append('fitnessFreak', fitnessFreak);
            formdata.append('moreResponsibilities', moreResponsibilities);
            formdata.append('likeCooking', likeCooking);
            formdata.append('likeTraveling', likeTraveling);
            formdata.append('partnerWorking', partnerWorking);
            formdata.append('spirituallyStrong', spirituallyStrong);
            formdata.append('nityaPoojaDaily', nityaPoojaDaily);
            formdata.append('sansthaName', sansthaName);
            formdata.append('mandalName', mandalName);
            formdata.append('sampradayaFast', sampradayaFast);
            formdata.append('templeVisit', templeVisit);
            formdata.append('eatOnionGarlic', eatOnionGarlic);
            formdata.append('aarti', aarti);
            formdata.append('wearKanthi', wearKanthi);
            formdata.append('volunteerActivities', volunteerActivities);
            formdata.append('define', define);
            formdata.append('tilakChandlo', tilakChandlo);
            formdata.append('shibir', shibir);
            photos.forEach(photo => {
                if (photo instanceof File) {
                    formdata.append('file', photo);
                } else {
                    formdata.append('file', photo.filename);
                }

            });




            // photos.forEach(photo => {
            //     formdata.append('file_check', JSON.stringify(photo));
            // });


            console.log(Array.from(formdata));

            // return false;

            const requestoptions = {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                body: formdata,
            };
            await fetch(`${API_URL}/api/updateMatrimonyUserDataById`, requestoptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.status == 200) {
                        swal({
                            text: data.message,
                            icon: "success",
                        });
                        Navigate(`/MyMatrimonyprofile?id=${id}`)
                    }
                    else {
                        swal({
                            text: data.message,
                            icon: "error",
                        });
                    }
                })

        } catch (err) {
            console.error(err.message);
        }
    }


    const handlePhotosChange = (e) => {
        const files = Array.from(e.target.files);

        if (photos.length + files.length > 5) {
            const remainingSlots = 5 - photos.length;
            const filesToAdd = files.slice(0, remainingSlots);

            swal({
                text: `You can only upload 5 Photos`,
                icon: "warning",
            });

            const previews = filesToAdd.map(file => URL.createObjectURL(file));
            setPhotos([...photos, ...filesToAdd]);
            setPreviewPhotos([...previewPhotos, ...previews]);
        }
        else {
            const previews = files.map(file => URL.createObjectURL(file));
            setPhotos([...photos, ...files]);
            setPreviewPhotos([...previewPhotos, ...previews]);

        }


    };


    const removePhoto = (index) => {
        const updatedSelectedPhotos = [...photos];
        updatedSelectedPhotos.splice(index, 1);

        const updatedPreviews = [...previewPhotos];
        updatedPreviews.splice(index, 1);

        setPhotos(updatedSelectedPhotos);
        setPreviewPhotos(updatedPreviews);
    };



    console.log(photos);
    console.log(previewPhotos);




    const usergender = () => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            fetch(`${API_URL}/api/usergendertypeList`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setGenderList(data.data);
                });

        } catch (error) {
            console.log(error);
        }
    }


    console.log(genderList)


    const formatDate = (date) => {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    };

    const allowOnlyNumbers = (e) => {
        e.preventDefault();
        const input = e.target;
        const value = input.value.replace(/[^\d]/g, ''); // Replace any non-numeric characters with an empty string
        input.value = value; // Set the input value to the filtered value
    }

    console.log(previewPhotos)

    const handlePhoneChange = (value) => {
        setPhone_number(value);
        if (value === '' || value === undefined) {
            setIsPhoneValid(true);
        } else {
            setIsPhoneValid(isValidPhoneNumber(value));
        }
    };


    console.log(profiledata?.dateOfBirth)

    return (
        <div>
            <Container fluid className='matrimonialform mb-5'>
                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Basic Information</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4}>
                                <div className='profileimgc'>
                                    <img src={image != profile ? image : `${API_URL}/uploads/profile_pic/${profile_pic?.filename}`} alt="Profile" onError={profile} />
                                </div>
                            </Col>
                            <Col lg={8}>
                                <Row>
                                    <Col lg={6} className='mb-2'>
                                        <label>First Name</label>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control readOnly type="text" placeholder="Enter your first name" defaultValue={first_name} />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} className='mb-2'>
                                        <label>Last Name</label>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control readOnly type="text" placeholder="Enter your last name" defaultValue={last_name}  />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} className='mb-2'>
                                        <label>Gender</label>
                                        <Form.Group className="mb-3" controlId="formBasicEmail" >
                                            <Form.Control readOnly type="text" defaultValue={gender} />

                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} className='mb-2'>
                                        <label>Date of Birth</label>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Control readOnly type="date" placeholder="Enter your date of birth" value={formatDate(profiledata?.dateOfBirth)} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Age</label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control readOnly type="number" placeholder="Enter your age"  value={age} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Marital Status</label>
                                <Form.Select className='mb-3 appearance-none' onChange={(e) => setMarital_status(e.target.value)} disabled="true">
                                    <option hidden>Select Status</option>
                                    {maritalStatusList?.map((status, index) => (
                                        <option key={index} value={status._id} selected={marital_status == status._id}>{status.type}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Nationality</label>
                                <Form.Select className='mb-3 appearance-none' onChange={(e) => setNationality(e.target.value)} disabled="true">
                                    <option hidden>Select Nationality</option>
                                    {NationalityList?.map((nationalitys, index) => (
                                        <option key={index} value={nationalitys._id} selected={nationality == nationalitys._id}>{nationalitys.country_name}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Mother Tongue</label>
                                <Form.Select className='mb-3 appearance-none' onChange={(e) => setMother_tongue(e.target.value)} disabled="true">
                                    <option hidden>Select Mother Tongue</option>
                                    {MotherTongueList?.map((motherTongue, index) => (
                                        <option key={index} value={motherTongue?._id} selected={mother_tongue == motherTongue?._id}>{motherTongue?.type}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Language Known</label>
                               {/* <Form.Select className='mb-3 appearance-none' onChange={(e) => setLanguage_known(e.target.value)} disabled="true">
                                    <option hidden>Select Languages Known</option>
                                    {LanguageList?.map((motherTongue, index) => (
                                        <option key={index} value={motherTongue._id} selected={language_known == motherTongue?._id}>{motherTongue.language}</option>
                                    ))}
                                </Form.Select>
                                */}

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control readOnly type="text" placeholder="Languages Known" value={profiledata?.languagesKnown} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Caste</label>
                                {/* <Form.Select className='mb-3 appearance-none' onChange={(e) => setCast_id(e.target.value)} disabled="true">
                                    <option hidden>Select Caste</option>
                                    {casteList?.map((caste, index) => (
                                        <option key={index} value={caste._id} selected={cast_id == caste?._id}>{caste.type}</option>
                                    ))}
                                </Form.Select> */}
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control readOnly type="text" placeholder="Enter your caste" value={cast_id} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Sub Caste</label>
                                {/* <Form.Select className='mb-3 appearance-none' onChange={(e) => setSub_caste(e.target.value)} disabled="true">
                                    <option hidden>Select Sub Caste</option>

                                    {
                                        subCasteList?.map((subCaste, index) => (
                                            <option key={index} value={subCaste._id} selected={sub_caste == subCaste?._id}>{subCaste.type}</option>
                                        ))
                                    }

                                </Form.Select> */}
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control readOnly type="text" placeholder="Enter your subcaste" value={sub_caste} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Gotra</label>
                                <Form.Group className="mb-3 " controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder='Enter your Gotra' className='mb-3' onChange={(e) => setGotra(e.target.value)} defaultValue={gotra}  />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Height(cm)</label>
                                <Form.Group className="mb-3">
                                    <Form.Control readOnly type="text" placeholder="Enter your height (cm)" onChange={(e) => setHeight(e.target.value)} defaultValue={height} onInput={allowOnlyNumbers} maxLength={3} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Weight(kg)</label>
                                <Form.Group className="mb-3" controlId="formBasicEmail"  >
                                    <Form.Control readOnly type="text" placeholder="Enter your weight (kg)" onChange={(e) => setWeight(e.target.value)} defaultValue={weight} onInput={allowOnlyNumbers} maxLength={3} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Info About me</label>
                                <Form.Group className="mb-3" controlId="formBasicEmail" >
                                    <Form.Control as="textarea"
                                        rows={3}
                                        placeholder="Enter here"
                                        value={info_about_me}
                                        onChange={(e) => setInfo_about_me(e.target.value)}
                                        readOnly
                                    />

                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Hobbies</label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control readOnly type="text" placeholder="Enter your hobbies here" onChange={(e) => setHobbies(e.target.value)} defaultValue={hobbies} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Mobile Number</label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control readOnly type="text" placeholder="Enter your Mobile Number" onChange={(e) => setPhone_number(e.target.value)} defaultValue={phone_number} onInput={allowOnlyNumbers} maxLength={12} />
                                    {/* <PhoneInput
                                        className={`form-control ${!isPhoneValid ? 'is-invalid' : ''}`}
                                        defaultCountry="IN"
                                        international
                                        countryCallingCodeEditable={false}
                                        localization={en}
                                        placeholder="Enter your Mobile Number"
                                        value={phone_number}
                                        onChange={handlePhoneChange}
                                        style={inputStyles}
                                    /> */}
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>WhatsApp Number</label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control readOnly type="text" placeholder="Enter your WhatsApp Number" onChange={(e) => setWhatsApp_number(e.target.value)} defaultValue={WhatsApp_number} onInput={allowOnlyNumbers} maxLength={12} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Facebook Link</label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control readOnly type="text" placeholder="Enter your Facebook Link" onChange={(e) => setFacebook_link(e.target.value)} defaultValue={facebook_link} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Instagram Link</label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control readOnly type="text" placeholder="Enter your Instagram Link" onChange={(e) => setInstagram_link(e.target.value)} defaultValue={instagram_link} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>LinkedIn Link</label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control readOnly type="text" placeholder="Enter your LinkedIn Link" onChange={(e) => setLinkedin_link(e.target.value)} defaultValue={linkedin_link} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Handicap</label>
                                <input disabled="true" type="checkbox" className='mb-3' onChange={(e) => setHandicap(e.target.checked)} defaultChecked={handicap} />
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Present Address</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-2'>
                                <label>Country</label>
                                <Form.Select className='mb-3  appearance-none ' onChange={(e) => setCountry_id(e.target.value)} disabled="true">
                                    <option hidden>Select Country</option>
                                    {NationalityList?.map((nationality, index) => (
                                        <option key={index} value={nationality._id} selected={country_id == nationality._id}>{nationality.country_name}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>State</label>
                                <Form.Select className='mb-3  appearance-none ' onChange={(e) => setState_id(e.target.value)} disabled="true">
                                    <option hidden>Select State</option>
                                    {stateList?.map((state, index) => (
                                        <option key={index} value={state._id} selected={state_id == state._id}>{state.state_name}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>City</label>
                                <Form.Select className='mb-3  appearance-none ' onChange={(e) => setCity_id(e.target.value)} disabled="true">
                                    <option hidden>Select City</option>
                                    {cityList?.map((city, index) => (
                                        <option key={index} value={city._id} selected={city_id == city._id}>{city.city_name}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Permanent Address</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-2'>
                                <label>Country</label>
                                <Form.Select className='mb-3  appearance-none ' onChange={(e) => setPermanent_country_id(e.target.value)} disabled="true">
                                    <option hidden>Select Country</option>
                                    {NationalityList?.map((nationality, index) => (
                                        <option key={index} value={nationality._id} selected={permanent_country_id == nationality._id}>{nationality.country_name}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>State</label>
                                <Form.Select className='mb-3  appearance-none ' onChange={(e) => setPermanent_state_id(e.target.value)} disabled="true">
                                    <option hidden>Select State</option>
                                    {permanentStateList?.map((state, index) => (
                                        <option key={index} value={state._id} selected={permanent_state_id == state._id}>{state.state_name}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>City</label>
                                <Form.Select className='mb-3  appearance-none ' onChange={(e) => setPermanent_city_id(e.target.value)} disabled="true">
                                    <option hidden>Select City</option>
                                    {permanentCityList?.map((city, index) => (
                                        <option key={index} value={city._id} selected={permanent_city_id == city._id}>{city.city_name}</option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Education</h3>
                    <div className='descr-content'>
                        {educationEntries.map((entry, index) => (
                            <div key={index}>
                                <Row>
                                    <Col lg={4} className='mb-2'>
                                        <label>Degree</label>
                                        <Form.Group className="mb-3">
                                            <Form.Control type="text"
                                                placeholder="Enter your degree"
                                                defaultValue={entry.degree}
                                                onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={4} className='mb-2'>
                                        <label>Institution</label>
                                        <Form.Group className="mb-3">
                                            <Form.Control type="text"
                                                placeholder="Enter your institute name"
                                                defaultValue={entry.institution}
                                                onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={4} className='mb-2'>
                                        <label>Year Of Passing</label>
                                        <Form.Group className="mb-3">
                                            <Form.Control type="text"
                                                placeholder="Enter your year of passing"
                                                defaultValue={entry.year_of_passing}
                                                onChange={(e) => handleEducationChange(index, 'year_of_passing', e.target.value)}
                                                onInput={allowOnlyNumbers} maxLength={4}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Career</h3>
                    <div className='descr-content'>
                        {careers.map((career, index) => (
                            <div key={index}>
                                <Row>
                                    <Col lg={4} className='mb-2'>
                                        <label>Occupation</label>
                                        <Form.Group className="mb-3">
                                            <Form.Control type="text"
                                                placeholder="Enter your occupation"
                                                value={career.occupation}
                                                onChange={(e) => handleCareerChange(index, 'occupation', e.target.value)}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={4} className='mb-2'>
                                        <label>Company</label>
                                        <Form.Group className="mb-3" >
                                            <Form.Control type="text"
                                                placeholder="Enter your company"
                                                value={career.company}
                                                onChange={(e) => handleCareerChange(index, 'company', e.target.value)}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={4} className='mb-2'>
                                        <label>Annual Income</label>
                                        <Form.Group className="mb-3" >
                                            <Form.Control type="text"
                                                placeholder="Enter your annual income"
                                                value={career.income}
                                                onChange={(e) => handleCareerChange(index, 'income', e.target.value)}
                                                onInput={allowOnlyNumbers}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Family Information</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-2'>
                                <label>Father’s Name</label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter your father's name" onChange={(e) => setFatherName(e.target.value)} defaultValue={fatherName} readOnly />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Father’s Occupation</label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter your father's occupation" onChange={(e) => setFatherOccupation(e.target.value)} defaultValue={fatherOccupation} readOnly />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Father’s Education</label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter your father's education" onChange={(e) => setFatherEducation(e.target.value)} defaultValue={fatherEducation} readOnly />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Mother’s Name</label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter your mother's name" onChange={(e) => setMotherName(e.target.value)} defaultValue={motherName} readOnly />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Mother’s Occupation</label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter your mother's occupation" onChange={(e) => setMotherOccupation(e.target.value)} defaultValue={motherOccupation} readOnly />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Mother’s Education</label>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Enter your mother's education" onChange={(e) => setMotherEducation(e.target.value)} defaultValue={motherEducation} readOnly />
                                </Form.Group>
                            </Col>
                        </Row>
                        {siblings.map((sibling, index) => (
                            <div key={index}>
                                <Row>
                                    <Col lg={4} className='mb-2'>
                                        <label>Sibling’s Name</label>
                                        <Form.Group className="mb-3">
                                            <Form.Control type="text"
                                                placeholder="Enter name"
                                                value={sibling.siblingName}
                                                onChange={(e) => handleSiblingChange(index, 'siblingName', e.target.value)}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={4} className='mb-2'>
                                        <label>Marital Status</label>
                                        <Form.Select className='mb-3  appearance-none ' onChange={(e) => handleSiblingChange(index, 'siblingMaritalStatus', e.target.value)} disabled="true">
                                            <option hidden>Select Status</option>
                                            {maritalStatusList?.map((status, index) => (
                                                <option key={index} value={status._id} selected={sibling.siblingMaritalStatus == status._id}>{status.type}</option>
                                            ))}
                                        </Form.Select>

                                    </Col>
                                    <Col lg={4} className='mb-2'>
                                        <label>Sibling’s Education</label>
                                        <Form.Group className="mb-3" >
                                            <Form.Control type="text"
                                                placeholder="Enter education"
                                                value={sibling.siblingEducation}
                                                onChange={(e) => handleSiblingChange(index, 'siblingEducation', e.target.value)}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Astronomic Information</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-2'>
                                <label>Time Of Birth</label>
                                <Form.Group className="mb-3"  >
                                    <Form.Control type="time" placeholder="Enter your time of birth" onChange={(e) => setTimeOfBirth(e.target.value)} value={timeOfBirth} readOnly />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>City Of Birth</label>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" placeholder="Enter your City of birth" onChange={(e) => setCityOfBirth(e.target.value)} value={cityOfBirth} readOnly />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Mangal Dosh</label>
                                <Form.Select className='mb-3  appearance-none ' onChange={(e) => setMangalDosh(e.target.value)} value={mangalDosh} disabled="true">
                                    <option hidden>Select</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Shani Dosh</label>
                                <Form.Select className='mb-3  appearance-none ' onChange={(e) => setShanidosh(e.target.value)} value={shanidosh} disabled="true">
                                    <option hidden>Select</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </Form.Select>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Life Style</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-2'>
                                <label>Are you a fitness freak ?</label>
                                <Form.Select className='mb-3  appearance-none ' onChange={(e) => setFitnessFreak(e.target.value)} value={fitnessFreak} disabled="true">
                                    <option hidden>Select</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Are you prepared to take on more responsibilities?</label>
                                <Form.Select className='mb-3  appearance-none ' onChange={(e) => setMoreResponsibilities(e.target.value)} value={moreResponsibilities} disabled="true">
                                    <option hidden>Select</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Do you like cooking?</label>
                                <Form.Select className='mb-3  appearance-none ' onChange={(e) => setLikeCooking(e.target.value)} value={likeCooking} disabled="true">
                                    <option hidden>Select</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Do you like traveling?</label>
                                <Form.Select className='mb-3  appearance-none ' onChange={(e) => setLikeTraveling(e.target.value)} value={likeTraveling} disabled="true">
                                    <option hidden>Select</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Are you and your family fine with your partner working after marriage?</label>
                                <Form.Select className='mb-3  appearance-none ' onChange={(e) => setPartnerWorking(e.target.value)} value={partnerWorking} disabled="true">
                                    <option hidden>Select</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Are you spiritually strong?</label>
                                <Form.Select className='mb-3  appearance-none ' onChange={(e) => setSpirituallyStrong(e.target.value)} value={spirituallyStrong} disabled="true">
                                    <option hidden>Select</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </Form.Select>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Life Style</h3>
                    <div className='descr-content'>
                        <Row>
                            <Col lg={4} className='mb-2'>
                                <label>Do you perform Nitya Pooja Daily?</label>
                                <Form.Select className='mb-3  appearance-none ' onChange={(e) => setNityaPoojaDaily(e.target.value)} value={nityaPoojaDaily} disabled="true">
                                    <option hidden>Select</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>From which sanstha of swaminarayan you belongs to ?</label>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" placeholder="Enter here" onChange={(e) => setSansthaName(e.target.value)} value={sansthaName} readOnly />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Name of the Mandal</label>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" placeholder="Enter here" onChange={(e) => setMandalName(e.target.value)} value={mandalName} readOnly />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Do you observe all fast prescribed in Sampradaya?</label>
                                <Form.Select className='mb-3  appearance-none ' onChange={(e) => setSampradayaFast(e.target.value)} value={sampradayaFast} disabled="true">
                                    <option hidden>Select</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Frequency of Temple Visits</label>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" placeholder="Enter here" onChange={(e) => setTempleVisit(e.target.value)} value={templeVisit} readOnly />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Do you Eat Onion/Garlic?</label>
                                <Form.Select className='mb-3  appearance-none ' onChange={(e) => setEatOnionGarlic(e.target.value)} value={eatOnionGarlic} disabled="true">
                                    <option hidden>Select</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Do you Perform Aarti, Evening Ghar Sabha etc ?</label>
                                <Form.Select className='mb-3  appearance-none ' onChange={(e) => setAarti(e.target.value)} value={aarti} disabled="true">
                                    <option hidden>Select</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Do you wear Kanthi ?</label>
                                <Form.Select className='mb-3  appearance-none ' onChange={(e) => setWearKanthi(e.target.value)} value={wearKanthi} disabled="true">
                                    <option hidden>Select</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Any Volunteer Activities?</label>
                                <Form.Select className='mb-3  appearance-none ' onChange={(e) => setVolunteerActivities(e.target.value)} value={volunteerActivities} disabled="true">
                                    <option hidden>Select</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Define Yourself as Satsangi</label>
                                <Form.Group className="mb-3">
                                    <Form.Control as="textarea"
                                        rows={3}
                                        placeholder="Enter here"
                                        value={define}
                                        onChange={(e) => setDefine(e.target.value)}
                                        readOnly
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Do you make Tilak Chandlo ?</label>
                                <Form.Select className='mb-3  appearance-none ' onChange={(e) => setTilakChandlo(e.target.value)} value={tilakChandlo} disabled="true">
                                    <option hidden>Select</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </Form.Select>
                            </Col>
                            <Col lg={4} className='mb-2'>
                                <label>Do you attend shibir ?</label>
                                <Form.Select className='mb-3  appearance-none ' onChange={(e) => setShibir(e.target.value)} value={shibir} disabled="true">
                                    <option hidden>Select</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </Form.Select>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className='profilegallery mb-5'>
                    <h3 className='text-center'>Photos</h3>
                    <div className='descr-content'>
                        <div>
                            <Row>
                                {previewPhotos?.map((photo, index) => (
                                    <Col lg={2} key={index}>

                                            <div className='photo-container mb-2'>
                                                <img src={`${API_URL}/uploads/photos/${photo.filename}`} alt="Photo" className="photoorodfd" />
                                            </div>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default MatrimonyUserdetail;