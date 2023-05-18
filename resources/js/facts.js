const generateEl = document.getElementById("generate");
const factEl = document.getElementById("fact");
const resetEl = document.getElementById("reset");
const animEl = document.getElementById("anim");

const facts = [
    "The average person breathes in about 15,000 liters of air every day, so it's essential to make sure that air is clean and healthy.",
    "Air pollution can have a serious impact on our health, causing respiratory problems, allergies, and even heart disease.",
    "Indoor air pollution can be just as harmful as outdoor pollution, so it's important to keep our homes well-ventilated and free from harmful chemicals.",
    "Did you know that air pollution can affect our cognitive abilities? Breathing in polluted air has been linked to decreased attention span and impaired thinking skills.",
    "Air pollution isn't just bad for us humans; it also affects our furry friends. Pets can suffer from respiratory issues and other health problems due to poor air quality.",
    "Smog, a type of air pollution, is like a big gray blanket covering the sky. It's created when pollutants from vehicles and industry react with sunlight.",
    "Indoor plants are like little air purifiers. They can help remove toxins from the air and improve indoor air quality.",
    "The smell of fresh air after a rainstorm is not just pleasant-it's a sign that the rain has washed away pollutants and cleaned the air.",
    "Did you know that air pollution can also harm our skin? It can cause dryness, irritation, and premature aging.",
    "The main sources of outdoor air pollution include transportation emissions, industrial activities, and the burning of fossil fuels.",
    "Air pollution doesn't just stay in one place-it can travel long distances through wind patterns, affecting even remote areas.",
    "The World Health Organization estimates that 9 out of 10 people worldwide breathe polluted air, highlighting the global nature of the air quality challenge.",
    "The ozone layer, located in the Earth's stratosphere, acts like a protective shield, filtering out harmful ultraviolet (UV) rays from the sun.",
    "Air pollution can have significant economic impacts. It can lead to increased healthcare costs, reduced agricultural productivity, and decreased tourism.",
    "Did you know that air pollution can contribute to climate change? Certain pollutants, like carbon dioxide, trap heat in the atmosphere, leading to global warming.",
    "The burning of fossil fuels, such as coal and oil, releases pollutants like sulfur dioxide and nitrogen oxides, which can contribute to smog formation and respiratory issues.",
    "Forest fires can have a severe impact on air quality. The smoke produced contains harmful particles and gases that can travel long distances.",
    "Air pollution is a major environmental risk factor for lung cancer. Long-term exposure to polluted air can increase the risk of developing this disease.",
    "Children and older adults are particularly vulnerable to the health effects of air pollution due to their developing or weakened respiratory systems.",
    "In some cities, air pollution is so severe that schools and outdoor activities are occasionally canceled to protect people, especially children, from breathing in the harmful pollutants.",
    "Did you know that the air inside our homes can be more polluted than the air outside? Household products, like cleaning agents and paints, can release toxic chemicals into the air.",
    "Air pollution can impact crop yields and food quality. Certain pollutants can harm plants, leading to reduced agricultural productivity and potential food shortages.",
    "The Clean Air Act, a U.S. federal law, was established in 1970 to regulate air pollution and protect human health and the environment.",
    "Low-income communities often bear a disproportionate burden of air pollution due to the location of polluting industries and lack of access to clean resources.",
    "In some countries, people wear face masks to protect themselves from air pollution. These masks have filters that help trap harmful particles.",
    "Did you know that air pollution can also affect our sleep? Breathing in polluted air can lead to sleep disturbances and increased risk of sleep disorders.",
    "Volatile organic compounds (VOCs) are chemicals found in many household products, such as paints, air fresheners, and furniture. They can evaporate into the air and contribute to indoor air pollution.",
    "Air quality index (AQI) is a measure used to assess the level of air pollution in a specific area. It typically ranges from 0 to 500, with higher values indicating poorer air quality.",
    "Greenhouse gases, such as carbon dioxide and methane, contribute to the greenhouse effect, which traps heat in the atmosphere and leads to global warming.",
    "The use of renewable energy sources, such as solar and wind power, can help reduce air pollution by decreasing reliance on fossil fuels.",
    "Did you know that air pollution can also impact our cardiovascular system? It can increase the risk of heart attacks, stroke, and other cardiovascular diseases.",
    "Acid rain is a result of air pollution. When pollutants like sulfur dioxide and nitrogen oxides mix with rainwater, it becomes acidic and can harm ecosystems, including lakes and forests.",
    "Trees are like nature's air filters. They absorb carbon dioxide and release oxygen, helping to clean the air and combat climate change.",
    "The color of the sky can indicate air quality. On clear days, the sky appears blue because air molecules scatter shorter-wavelength blue light more than other colors.",
    "Industrial emissions, such as those from factories and power plants, are major contributors to air pollution. Installing effective air pollution control technologies can help mitigate their impact.",
    "Did you know that air pollution can affect unborn babies? Pregnant women exposed to polluted air may have a higher risk of premature birth and other complications.",
    "Radon gas is a naturally occurring radioactive gas that can seep into homes from the ground. Prolonged exposure to high levels of radon can increase the risk of lung cancer.",
    "The World Health Organization has classified outdoor air pollution as a leading environmental cause of cancer, placing it in the same category as tobacco smoke and asbestos.",
    "The concept of 'smog' was coined in the early 20th century, combining the words 'smoke' and 'fog' to describe the hazy air pollution prevalent in industrialized cities.",
    "Air pollution can have detrimental effects on wildlife. Birds, for example, can experience respiratory issues and changes in their migratory patterns due to polluted air.",
    "Cigarette smoke is a significant source of indoor air pollution. Secondhand smoke can be particularly harmful, leading to respiratory problems and an increased risk of lung cancer in non-smokers.",
    "Did you know that air pollution can worsen allergies and asthma? Pollutants like pollen, dust, and mold spores can trigger allergic reactions and asthma attacks.",
    "The Montreal Protocol, an international environmental agreement, was designed to protect the ozone layer by phasing out the production and use of ozone-depleting substances, such as chlorofluorocarbons (CFCs).",
    "Air quality monitoring stations are set up in various locations to measure pollutant levels and provide real-time information about local air quality conditions.",
    "Poor air quality can have economic consequences. It can lead to increased healthcare costs, reduced worker productivity, and decreased tourism revenue in affected areas.",
    "Did you know that indoor air pollution can be higher during cooking? Fumes from cooking with certain fuels, like wood or coal, can release harmful particles and gases into the air.",
    "The concept of 'clean coal' is a misnomer. While technologies exist to reduce certain emissions from coal combustion, coal still releases significant amounts of carbon dioxide and other pollutants.",
    "Air pollution isn't just a problem for Earth-it's also an issue in space. Astronauts on the International Space Station have air purification systems to maintain clean air quality.",
    "The Great Smog of London in 1952 was one of the most severe air pollution episodes in history. It resulted in thousands of deaths and led to the implementation of clean air regulations.",
    "Taking steps to improve air quality, such as reducing vehicle emissions, promoting clean energy, and implementing stricter regulations, can have significant health benefits and contribute to a healthier planet for future generations.",
    "Air pollution poses significant health risks, as it can lead to respiratory problems, cardiovascular diseases, and even premature death.",
    "Poor air quality is often caused by the presence of pollutants such as particulate matter, nitrogen dioxide, sulfur dioxide, ozone, and volatile organic compounds.",
    "Exposure to air pollution can trigger or exacerbate asthma and allergies, leading to respiratory symptoms such as coughing, wheezing, and shortness of breath.",
    "The burning of fossil fuels for energy production and transportation is a major contributor to outdoor air pollution.",
    "Indoor air pollution can result from various sources, including cooking and heating appliances, tobacco smoke, building materials, and household chemicals.",
    "Particulate matter (PM) refers to tiny particles suspended in the air, which can be solid or liquid. These particles come in different sizes, and the smallest ones (PM2.5 and PM10) can penetrate deep into the lungs and even enter the bloodstream.",
    "Nitrogen dioxide (NO2) is primarily emitted from burning fossil fuels, especially in vehicles and power plants. Exposure to NO2 can lead to respiratory inflammation and decreased lung function.",
    "Sulfur dioxide (SO2) is released during the combustion of fossil fuels, particularly in industrial processes. It can cause respiratory issues and contribute to the formation of acid rain.",
    "Ozone (O3) at ground level, known as tropospheric ozone, is formed when pollutants like nitrogen oxides and volatile organic compounds react in the presence of sunlight. High levels of ozone can cause respiratory problems and irritate the eyes.",
    "Volatile organic compounds (VOCs) are emitted by various sources such as paints, solvents, cleaning products, and vehicle emissions. They can have short-term and long-term health effects, including eye and respiratory irritation and the potential for organ damage.",
    "The Air Quality Index (AQI) is a scale used to measure and report daily air quality levels. It categorizes air quality into six levels, ranging from "good" to "hazardous, " based on pollutant concentrations.",
    "Urban areas tend to have higher levels of air pollution due to increased industrial activities, traffic congestion, and population density.",
    "Exposure to air pollution during pregnancy can have adverse effects on fetal development, including low birth weight, preterm birth, and developmental issues.",
    "Long-term exposure to air pollution has been associated with an increased risk of chronic conditions such as heart disease, stroke, lung cancer, and respiratory infections.",
    "Certain populations, such as children, older adults, and individuals with pre-existing respiratory or cardiovascular conditions, are more vulnerable to the health impacts of air pollution.",
    "The Clean Air Act, enacted in many countries, including the United States, establishes regulations and standards to reduce air pollution and protect public health.",
    "Renewable energy sources like solar and wind power can help reduce air pollution by providing clean alternatives to fossil fuel combustion.",
    "Green infrastructure, such as urban green spaces and tree planting initiatives, can help improve air quality by absorbing pollutants and promoting oxygen production.",
    "Air quality monitoring stations collect data on pollutant levels, helping authorities and researchers assess the effectiveness of pollution control measures and inform the public about current air quality conditions.",
    "Cross-border air pollution can occur when pollutants are carried by wind currents over long distances, emphasizing the need for international cooperation to address air quality challenges.",
    "Public awareness and individual actions, such as reducing vehicle emissions, conserving energy, and using eco-friendly products, can contribute to improving air quality.",
    "Forest fires can significantly impact air quality, releasing large amounts of smoke and pollutants into the atmosphere. The severity of the effects depends on the size and duration of the fire and the proximity to populated areas.",
    "Air pollution control technologies, such as electrostatic precipitators, catalytic converters, and scrubbers, help reduce emissions from industrial processes and vehicles.",
    "Indoor air quality can be improved by ensuring proper ventilation, using air purifiers, minimizing the use of chemical products, and regularly maintaining heating and cooling systems.",
    "International agreements, such as the Paris Agreement, aim to address climate change and reduce greenhouse gas emissions, which can indirectly improve air quality by mitigating the impact of global warming.",
    "Developing countries often face more significant challenges in managing air quality due to rapid industrialization, limited resources, and a lack of stringent regulations.",
    "Low-income communities are often disproportionately affected by air pollution, as they may live in areas near industrial facilities or highways with higher pollutant concentrations.",
    "Urban planning strategies that promote sustainable transportation, such as bike lanes, pedestrian-friendly infrastructure, and efficient public transit, can help reduce air pollution from vehicle emissions.",
    "Light pollution, while not directly related to air quality, can have negative effects on the environment and disrupt natural ecosystems, including disrupting the sleep-wake cycles of humans and wildlife.",
    "The concept of air quality has gained increasing attention in recent years, leading to initiatives, research, and technological advancements aimed at monitoring and improving air quality worldwide.",
    "Climate change can influence air quality by altering weather patterns, which in turn affect the dispersion and concentration of pollutants in the atmosphere.",
    "The involvement of citizens in monitoring air quality, such as through the use of smartphone apps and personal air quality sensors, can provide valuable data for understanding local pollution levels and informing decision-making.",
    "Air pollution affects not only human health but also ecosystems, contributing to biodiversity loss, acidification of water bodies, and negative impacts on vegetation and wildlife.",
    "The World Health Organization (WHO) estimates that approximately 7 million premature deaths each year are linked to air pollution, making it one of the leading global health risks.",
    "In some cities, innovative solutions like green roofs and vertical gardens are being implemented to mitigate air pollution by absorbing pollutants and reducing the urban heat island effect.",
    "Air pollution can have economic implications, including increased healthcare costs, productivity losses due to illness, damage to crops and infrastructure, and reduced tourism due to negative perceptions of air quality.",
    "Noise pollution, often associated with urban areas, can also indirectly affect air quality by contributing to stress-related health issues and influencing behavior patterns, such as reducing physical activity or altering sleep patterns.",
    "The World Air Quality Index (WAQI) is an online platform that aggregates data from air quality monitoring stations worldwide, providing real-time information and historical records to users.",
    "Green transportation alternatives, such as electric vehicles and bicycles, can contribute to reducing air pollution and promoting sustainable mobility.",
    "Air pollution can impact the quality of water bodies through deposition of pollutants, affecting aquatic life and ecosystems. This is particularly evident in areas with acid rain and industrial contamination.",
    "Environmental justice is an important aspect of addressing air quality, ensuring fair distribution of pollution burdens and equitable access to clean air for all communities, regardless of socioeconomic status or background.",
    "The health effects of air pollution extend beyond the respiratory system. Studies have shown links between air pollution and adverse impacts on neurological development, cognitive function, and mental health.",
    "Satellite technology plays a crucial role in monitoring air quality on a global scale, providing valuable data for analyzing pollution patterns, tracking pollution transport, and assessing the effectiveness of pollution control measures.",
    "Urban heat islands, characterized by higher temperatures in densely populated areas, can exacerbate air pollution by enhancing the formation of ground-level ozone and trapping pollutants."
]

function reset() {
    gsap.to('#fact', { rotation: 0, x: 0, y: 0, scale: 1, duration: 0.5 });
}

let animations = [
    function () { gsap.to("#fact", { rotation: 5, duration: 1 }) },
    function () { gsap.to("#fact", { rotation: -5, duration: 1 }) },
    function () { gsap.to("#fact", { rotation: 355, duration: 1 }) },
    function () { gsap.to("#fact", { rotation: -355, duration: 1 }) },
    function () { gsap.to("#fact", { x: -10, duration: 1 }) },
    function () { gsap.to("#fact", { x: 10, duration: 1 }) },
    function () { gsap.to("#fact", { scale: 0.9, duration: 1 }) },
    function () { gsap.to("#fact", { scale: 1.1, duration: 1 }) },
    function () {
        let t1 = gsap.timeline();
        t1.to("#fact", { x: -10, duration: 0.5 })
            .to('#fact', { rotation: 350, duration: 0.5 })
            .to('#fact', { x: 20, y: -10, duration: 0.5 })
            .to('#fact', { rotation: -355, duration: 0.5 })
    },
    function () {
        let t1 = gsap.timeline();
        t1.to("#fact", { scale: 1.5, duration: 0.2 })
            .to('#fact', { scale: 1.0, duration: 0.2 })
            .to('#fact', { scale: 1.2, duration: 0.2 })
            .to('#fact', { scale: 0.9, duration: 0.2 })
    },
    function () {
        let t1 = gsap.timeline();
        t1.to("#fact", { y: -40, duration: 0.5 })
            .to('#fact', { x: -40, y: 40, duration: 0.5 })
            .to('#fact', { x: 40, y: 0, duration: 0.5 })
            .to('#fact', { x: -40, duration: 0.5 })
            .to('#fact', { x: 40, y: 40, duration: 0.5 })
            .to('#fact', { x: 0, y: -40, duration: 0.5 })
            .to('#fact', { x: 0, y: 0, duration: 0.5 })
    },
    function () {
        let t1 = gsap.timeline();
        t1.to('#fact', { x: -50, opacity: 0, duration: 0.5 })
            .to('#fact', { x: 100, duration: 0.2 })
            .to('#fact', { x: -10, opacity: 1, duration: 0.5 })
    },
    function () {
        let t1 = gsap.timeline();
        t1.to('#fact', { y: 10, scale: 0.95, duration: 1 })
            .to('#fact', { y: -1000, scale: 1, duration: 0.2 })
            .to('#fact', { rotation: -7.5, duration: 1 })
            .to('#fact', { y: 0, duration: 0.2 })
    },
    function () {
        let t1 = gsap.timeline();
        t1.to('#fact', { rotation: 9999, scale: 2, opacity: 0, duration: 1.5 })
            .to('#fact', { rotation: 2, scale: 1, opacity: 1, duration: 1.5 })
    }
]

let prevFact = -1;
let prevAnimation = -1;
function randomFact() {
    let random = Math.round(Math.random() * (facts.length - 1));
    while (random == prevFact) random = Math.round(Math.random() * (facts.length - 1));
    factEl.innerText = facts[random]
    prevFact = random;
}

function randomAnimation() {
    let random = Math.round(Math.random() * (animations.length - 1));
    while (random == prevAnimation) random = Math.round(Math.random() * (animations.length - 1));
    prevAnimation = random;
    return animations[Math.round(Math.random() * (animations.length - 1))];
}

generateEl.addEventListener('click', function () {
    reset();
    randomFact();
    randomAnimation()();

});
resetEl.addEventListener('click', function () {
    reset();
})
animEl.addEventListener('click', function () {
    reset();
    randomAnimation()();
})

randomFact();
//animations[10]();

randomAnimation()();