const views={
  home:{image:'ayvo-home-current.png',title:'Reprends le fil. <br>Crée la suite.',description:'Retrouve tes projets récents dès l’accueil, écoute leur dernière version de travail et reprends là où tu en étais. Tes quêtes créatives t’accompagnent pour garder le rythme.',points:['Projets récents et previews à portée de main', 'Un nouveau projet en un clic', 'Quêtes créatives et progression'],alt:'Accueil AYVO avec quatre projets récents, leurs waveforms et les quêtes de projet'},
  project:{image:'ayvo-project-current.png',title:'Ton morceau. <br>Tout autour.',description:'Ouvre le bon projet dans FL Studio, retrouve sa dernière preview et garde tes objectifs à portée de main. Tout part de la même fiche.',points:['Fichier FL Studio lié au projet','Preview, BPM et tonalité au même endroit','Objectifs et progression du morceau'],alt:'Fiche projet AYVO avec preview, fichier FL Studio et objectifs'},
  idea:{image:'ayvo-idea-current.png',title:'L’idée reste <br>avec le projet.',description:'Une phrase, une référence musicale, un moodboard ou une note vocale. Le pense-bête s’ouvre directement dans ton projet, pour garder sa direction créative sous les yeux.',points:['Texte et moodboard au même endroit','Liens musicaux pour tes inspirations','Notes vocales attachées au projet'],alt:'Le pense-bête ouvert dans un projet AYVO avec texte, moodboard, inspirations et note vocale'},
  library:{image:'ayvo-library.jpg',title:'Tes prods. <br>Prêtes à écouter.',description:'Tes exports rejoignent ta bibliothèque. Classe tes morceaux dans des packs, retrouve tes previews et réécoute tes créations sur ordinateur ou téléphone.',points:['Previews et morceaux exportés','Packs et rangement personnalisés','Partage par lien ou QR code'],alt:'Bibliothèque AYVO avec les packs et la liste des morceaux exportés'},
  sessions:{image:'ayvo-sessions-current.png',title:'Le chemin <br>derrière le son.',description:'Vois quand tu as travaillé sur un morceau, la durée de chaque session et le temps total passé. Tes objectifs t’aident à savoir quelle est la prochaine étape.',points:['Historique des sessions du projet','Dates, horaires et durées','Objectifs pour avancer à ton rythme'],alt:'Objectifs et historique des sessions FL Studio avec leurs durées dans AYVO'}
};
const modes={
  rush:{image:'rush.png',name:'RUSH',duration:'15 MINUTES · CHACUN SA PROD',title:'L’instinct. <br>Le chrono. <br>Ta prod.',description:'Quinze minutes pour passer de la page blanche au morceau. Fais des choix, avance et découvre ce que tu peux créer quand chaque minute compte.',rule:'Une prod complète. Un temps limité.',alt:'La salle Rush : un atelier musical avec des chronos rouges au mur'},
  relay:{image:'relay.png',name:'RELAIS',duration:'10 MIN + 1 MIN D’ÉCHANGE + 10 MIN',title:'Ta loop. <br>Son idée. <br>Deux nouvelles prods.',description:'Crée ta mélodie, échange une minute avec ton binôme, puis recevez chacun la loop de l’autre. À toi de transformer sa mélodie en morceau. À la fin, vos deux prods s’écoutent ensemble.',rule:'Deux beatmakers. Un échange réciproque.',alt:'La salle Relais : un studio chaleureux en argile, pensé pour les binômes'},
  vision:{image:'vision.png',name:'VISION',duration:'25 MINUTES · UNE IMAGE POUR INSPIRATION',title:'Une image. <br>Mille façons <br>de l’entendre.',description:'La même image pour tout le monde, autant d’interprétations que de beatmakers. Traduis son atmosphère en mélodie, en rythme et en textures.',rule:'Observe. Imagine. Compose.',alt:'La salle Vision : un cinéma musical avec fauteuils rouges et grand écran'},
  mute:{image:'mute.png',name:'MUTE',duration:'20 MINUTES · COMPOSE SANS ÉCOUTER',title:'Coupe le son. <br>Écoute ton <br>instinct.',description:'Coupe le master de ton DAW et compose sans entendre le résultat. Fais confiance à tes repères, puis découvre ta prod quand le son revient à la fin.',rule:'Le défi le plus silencieux. La surprise la plus sonore.',alt:'La salle Mute : un studio en argile avec enceintes scotchées et matériel abîmé'}
};
const $=selector=>document.querySelector(selector);
function wireTabs(selector, callback){
 const tabs=[...document.querySelectorAll(selector)];
 function select(tab){tabs.forEach(item=>{item.setAttribute('aria-selected',String(item===tab));item.tabIndex=item===tab?0:-1});callback(tab,tabs.indexOf(tab));}
 tabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>select(tab));
  tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(index+1)%tabs.length;if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;if(event.key==='Home')next=0;if(event.key==='End')next=tabs.length-1;if(next!==undefined){event.preventDefault();select(tabs[next]);tabs[next].focus();}});
 });
}
function animateView(element){element.classList.remove('view-enter');void element.offsetWidth;element.classList.add('view-enter')}
wireTabs('[data-view]',(tab,index)=>{
 const item=views[tab.dataset.view];$('#creative-image').src='assets/'+item.image;$('#creative-image').alt=item.alt;
 $('#creative-title').innerHTML=item.title;$('#creative-description').textContent=item.description;$('#creative-number').textContent=`0${index+1} / 0${Object.keys(views).length}`;
 $('#creative-points').replaceChildren(...item.points.map(text=>{const li=document.createElement('li');li.textContent=text;return li}));
 $('#creative-panel').setAttribute('aria-labelledby',tab.id);$('#creative-panel .screenshot-button').dataset.zoom='assets/'+item.image;$('#creative-panel .screenshot-button').setAttribute('aria-label','Agrandir : '+tab.textContent);animateView($('#creative-panel'));
});
wireTabs('[data-mode]',tab=>{
 const item=modes[tab.dataset.mode];$('#mode-image').src='assets/'+item.image;$('#mode-image').alt=item.alt;$('#mode-title').innerHTML=item.title;$('#mode-duration').textContent=item.duration;$('#mode-description').textContent=item.description;$('#mode-rule').textContent=item.rule;$('#mode-watermark').textContent=item.name;$('#mode-panel').setAttribute('aria-labelledby',tab.id);animateView($('.mode-copy'));
});
const lightbox=$('.lightbox');let lastFocus;
document.querySelectorAll('[data-zoom]').forEach(button=>button.addEventListener('click',()=>{lastFocus=button;lightbox.querySelector('img').src=button.dataset.zoom;lightbox.querySelector('img').alt=button.querySelector('img').alt;lightbox.showModal();document.body.style.overflow='hidden';}));
$('.lightbox-close').addEventListener('click',()=>lightbox.close());
lightbox.addEventListener('click',event=>{if(event.target===lightbox){const box=lightbox.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)lightbox.close();}});
lightbox.addEventListener('close',()=>{document.body.style.overflow='';lastFocus?.focus({preventScroll:true});});
$('#year').textContent=new Date().getFullYear();
if('IntersectionObserver'in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.07});
 document.querySelectorAll('.section-heading,.workflow article,.exports-copy,.organization-title,.organization-items article,.social-grid article,.progress-grid>article,.style-feature,.platform').forEach(element=>{element.classList.add('reveal');observer.observe(element)});
}
// No account access, analytics, forms or uploads in this local preview.
