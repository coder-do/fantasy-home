'use client';

import Image from "next/image";
import styles from "./page.module.css";
import Header from "./components/header";
import { useEffect, useState } from "react";
import { useLogin } from "./context/loginContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Entry {
  title: string;
  description: string;
  image: string;
}

interface Categories {
  [key: string]: Entry[];
}

export default function Home() {
  const [categories, setCategories] = useState<Categories>({});
  const [activeTab, setActiveTab] = useState<string>('');
  const { isLoggedIn } = useLogin();
  const router = useRouter();

  useEffect(() => {
    // location.reload();
    // console.log(router.)
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/fetchData');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategories(data);

        const firstCategory = Object.keys(data)[0];
        setActiveTab(firstCategory);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchCategories();
  }, []);

  const handleTabChange = (category: string) => {
    setActiveTab(category);
  };
  return (
    <>
      <div className="banner" id="home">
        <div className="header">
          <Header />
          <div className="container">
            <div className="banner-text">
              <section className="cd-intro">
                <h2 className="cd-headline letters scale">
                  <span>ტანსაცმელი, რომელიც უნდა იყოს</span>
                  <span className="cd-words-wrapper">
                    <b className="is-visible">Fantasy Home</b>
                    <b>mending</b>
                    <b>applique</b>
                    <b>alteration</b>
                  </span>
                </h2>
              </section>
              <div className="botton-agileits">
                <a href="#" className="hvr-rectangle-in" data-toggle="modal" data-target="#myModal1">know more</a>
              </div>
              <div className="agileits_w3layouts_call_mail">
                <ul>
                  <li><i className="fa fa-phone" aria-hidden="true"></i>+995 598 863 678</li>
                  <li><i className="fa fa-envelope-o" aria-hidden="true"></i><a
                    href="mailto:misakian91@mail.ru" target="_blank"><span className="__cf_email__"
                      data-cfemail="92fbfcf4fdd2f7eaf3ffe2fef7bcf1fdff">Misakian91@mail.ru</span></a></li>
                </ul>
              </div>
              <div className="banner-icons-agileinfo">
                <ul className="agileits_social_list">
                  <li><a href="#" className="w3_agile_facebook"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                  <li><a href="#" className="agile_twitter"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                  <li><a href="#" className="w3_agile_dribble"><i className="fa fa-dribbble" aria-hidden="true"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="myModal1" tabIndex={-1} role="dialog">
        <div className="modal-dialog">

          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4>Fantasy Home</h4>
              <img src="./images/a1.jpg" alt=" " className="img-responsive" />
              <h3 className="subheading-w3l">მოგესალმებით <span>Fantasy Home</span> – ში</h3>
              <p> where craftsmanship meets imagination! At Fantasy Home Designs, we take pride in transforming your visions into reality through our exceptional sawing services. Whether you're envisioning a rustic charm, a modern edge, or a timeless elegance, we have the expertise to bring your dreams to life.</p>
            </div>
          </div>
        </div>
      </div>

      <div id="about" className="banner-bottom">
        <div className="container">


          <div className="tittle-agileinfo">
            <h3>ჩვენს შესახებ</h3>
          </div>

          <div className="w3ls_banner_bottom_grid1">
            <div className="col-md-6 w3l_banner_bottom_left">
              <img src="images/a1.jpg" alt=" " className="img-responsive" />
            </div>
            <div className="col-md-6 w3l_banner_bottom_right">
              <h3 className="subheading-w3l">მოგესალმებით <span>Fantasy Home</span> – ში</h3>
              <p>კეთილი Fantasy Home სამკერვალო კომპანია, სადაც ოცნება შეხვდება ნაკერი. ჩვენს "უახლესი მუშაობის" განყოფილებაში შეისწავლეთ ჩვენი მომხიბვლელი შემოქმედება-მდიდრული ფარდები, პლიუს ბალიშები და მორგებული საწოლები-დეტალებისადმი გულმოდგინე ყურადღებით შექმნილი, სახლების ახირებულ სიწმინდეებად გარდაქმნა</p>
              <ul>
                <li><i className="fa fa-clone" aria-hidden="true"></i>Designing</li>
                <li><i className="fa fa-clone" aria-hidden="true"></i>Alteration</li>
                <li><i className="fa fa-clone" aria-hidden="true"></i>Mending</li>
                <li><i className="fa fa-clone" aria-hidden="true"></i>applique</li>
              </ul>
            </div>
            <div className="clearfix"> </div>
          </div>

        </div>
      </div>

      <div className="latest-works" id="works">
        <div className="container">
          <div className="tittle-agileinfo">
            <h3 className="white-w3ls">უახლესი ნამუშევრები</h3>
          </div>
          <div className="col-md-8 agileits_banner_bottom_grid_three">
            <div className="agileinfo_banner_bottom_grid_three_left">
              <div className="wthree_banner_bottom_grid_three_left1 grid">
                <figure className="effect-roxy">
                  <img src="images/a2.jpg" alt=" " className="img-responsive" />
                  <figcaption>
                    <h3><span>M</span>ending</h3>
                  </figcaption>
                </figure>
              </div>
              <p className="w3_agileits_para">გამოიკვლიეთ ჩვენი უახლესი სამუშაო განყოფილება, რომ ნახოთ ჩვენი გუნდის უახლესი შემოქმედება, წარმოაჩინოთ ინოვაციური დიზაინი და უწყვეტი ფუნქციონირება, რომელიც განსაზღვრავს ციფრულ გამოცდილებას.</p>
            </div>
            <div className="agileinfo_banner_bottom_grid_three_left">
              <p className="w3_agileits_para">აღმოაჩინეთ ჩვენი ბოლო პროექტები "უახლესი სამუშაო" განყოფილებაში, სადაც ჩვენ ვაჩვენებთ მრავალფეროვან პორტფელს, რომელიც მოიცავს ვებ-განვითარებას, გრაფიკულ დიზაინს და ბრენდინგს, თითოეული შემოქმედებითობითა და ზუსტი ოსტატობით არის გამსჭვალული</p>
              <div className="wthree_banner_bottom_grid_three_left1 grid">
                <figure className="effect-roxy">
                  <img src="images/a3.jpg" alt=" " className="img-responsive" />
                  <figcaption>
                    <h3><span>D</span>esigning</h3>
                  </figcaption>
                </figure>
              </div>

            </div>
            <div className="clearfix"> </div>
          </div>
          <div className="col-md-4 agileinfo_banner_bottom_grid_three_left bnr-btm3">
            <div className="wthree_banner_bottom_grid_three_left1 grid">
              <figure className="effect-roxy">
                <img src="images/a4.jpg" alt=" " className="img-responsive" />
                <figcaption>
                  <h3><span>A</span>lteration</h3>
                </figcaption>
              </figure>
            </div>
            <p className="w3_agileits_para">Dive შევიდა ჩვენი "უახლესი სამუშაო" განყოფილებაში მოწმენი კულმინაცია ჩვენი ვნება და ექსპერტიზა, როგორც ჩვენ აჩვენოს ჩვენი უახლესი ვებ დიზაინის და განვითარებული მოვლენები, რომელიც ასახავს ჩვენი ერთგულება საუკეთესო და კლიენტის კმაყოფილება.</p>
          </div>
          <div className="clearfix"> </div>
        </div>
      </div>

      <div className="services" id="services">
        <div className="container">
          <div className="tittle-agileinfo">
            <h3>მთავარი მომსახურება</h3>
          </div>
          <div className="w3_agileits_services_grids">
            <div className="w3_agileits_services_left">
              <img className="vachig" src="images/services.jpg" alt="" />
            </div>
            <div className="w3_agileits_services_right">
              <div className="col-md-6 w3_agileits_services_grid">
                <div className="w3_agileits_services_grid_agile">
                  <div className="w3_agileits_services_grid_1">
                    <i className="fa fa-female" aria-hidden="true"></i>
                  </div>
                  <h3>დიზაინი</h3>
                  <p>დიზაინი არის წარმოსახვის ხელშესახებ ფორმად გარდაქმნის ხელოვნება, სადაც შემოქმედება აკმაყოფილებს ფუნქციონალურობას ესთეტიკისა და მიზნის ჰარმონიულ ნაზავში. ეს არის რთული ცეკვა ინოვაციასა და პრაქტიკულობას შორის, გამოცდილების შექმნა, რომელიც რეზონანსს და შთაგონებას იწვევს.</p>
                </div>
              </div>
              <div className="col-md-6 w3_agileits_services_grid">
                <div className="w3_agileits_services_grid_agile">
                  <div className="w3_agileits_services_grid_1">
                    <i className="fa fa-scissors" aria-hidden="true"></i>
                  </div>
                  <h3>ცვლილება</h3>
                  <p>ტანსაცმლის შეცვლა გულისხმობს ზუსტ კორექტირებას, რომელიც მორგებს ტანსაცმელს ინდივიდუალური სხეულების შესაფერისად, აძლიერებს კომფორტს და სტილს დეტალებისადმი ზედმიწევნით ყურადღებით.</p>
                </div>
              </div>
              <div className="col-md-6 w3_agileits_services_grid">
                <div className="w3_agileits_services_grid_agile">
                  <div className="w3_agileits_services_grid_1">
                    <i className="fa fa-thumb-tack" aria-hidden="true"></i>
                  </div>
                  <h3>კერვა</h3>
                  <p>სამკერვალო ტანსაცმელი აერთიანებს შემოქმედებას ოსტატობასთან, ძაფების ქსოვას სტილისა და პიროვნების ტარებად გამონათქვამებად, ნაკერით ნაკერით.</p>
                </div>
              </div>
              <div className="col-md-6 w3_agileits_services_grid">
                <div className="w3_agileits_services_grid_agile">
                  <div className="w3_agileits_services_grid_1">
                    <i className="fa fa-puzzle-piece" aria-hidden="true"></i>
                  </div>
                  <h3> Applique</h3>
                  <p>Applique აერთიანებს ტექსტილის მხატვრობას განზომილებით, ფენების ქსოვილს, რათა შექმნას რთული დიზაინები, რომლებიც ამშვენებს და ამაღლებს ტანსაცმელს და დეკორს ტაქტილური ელეგანტურობით.</p>
                </div>
              </div>
              <div className="col-md-6 w3_agileits_services_grid">
                <div className="w3_agileits_services_grid_agile">
                  <div className="w3_agileits_services_grid_1">
                    <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                  </div>
                  <h3>მოდერნიზაცია</h3>
                  <p>მოდერნიზაცია მოიცავს ინოვაციების შეუპოვრ ძიებას, საზოგადოებებისა და ინდუსტრიების გადაკეთებას ტექნოლოგიური წინსვლის, კულტურული ევოლუციისა და პროგრესული აზროვნების საშუალებით..</p>
                </div>
              </div>
              <div className="col-md-6 w3_agileits_services_grid">
                <div className="w3_agileits_services_grid_agile">
                  <div className="w3_agileits_services_grid_1">
                    <i className="fa fa-link" aria-hidden="true"></i>
                  </div>
                  <h3>Mending</h3>
                  <p>Mending განასახიერებს ხელოვნების აღდგენა, ქსოვა თემა ზრუნვა და ოსტატობა აღორძინება და გააძლიეროს ქსოვილის საყვარელი ტანსაცმელი და სანუკვარ მოგონებები.</p>
                </div>
              </div>
              <div className="clearfix"> </div>
            </div>
          </div>
        </div>
      </div>

      <div className="about-w3layouts">
        <div className="container">
          <div className="tittle-agileinfo">
            <h3 className="white-w3ls">რამდენიმე საინტერესო ფაქტები</h3>
          </div>
          <div className="schedule-bottom">
            <div className="agileits_schedule_bottom_right">
              <div className="w3ls_schedule_bottom_right_grid">
                <h3 className="subheading-w3l white-w3ls">Fantasy Home <span>Designs</span> can change how you look at
                  <span>yourself</span>.
                </h3>
                <p>1. უძველესი ცნობილი ნემსი: უძველესი ცნობილი ნემსი თარიღდება დაახლოებით 25,000 წლის წინ, რომელიც დამზადებულია ძვლისგან ან სპილოს ძვლისგან ადრეული ადამიანების მიერ. ეს აღმოჩენა აჩვენებს კერვის უძველეს ფესვებს და მის მნიშვნელობას კაცობრიობის ისტორიაში.<br />
                  2. სამკერვალო მანქანებმა რევოლუცია მოახდინეს მოდაში: სამკერვალო მანქანის გამოგონებამ მე -19 საუკუნეში რევოლუცია მოახდინა მოდის ინდუსტრიაში, მკვეთრად გაზარდა ტანსაცმლის წარმოების სიჩქარე და ეფექტურობა. ეს ინოვაცია დემოკრატიზებდა მოდას, რაც თანამედროვე ტანსაცმელს უფრო ხელმისაწვდომს ხდიდა ცხოვრების ყველა ფენის ადამიანებისთვის.სიწმინდეები</p>

                <div className="clearfix"> </div>
              </div>
            </div>
            <div className="clearfix"> </div>
          </div>
        </div>
      </div>

      <div style={{ paddingTop: '10%' }} id="gallery" className="gallery">
        <div className="tittle-agileinfo">
          <h3>ნამუშევრები</h3>
        </div>
        <div className="container">
          <div className="bs-example bs-example-tabs" role="tabpanel" data-example-id="togglable-tabs">
            <ul id="myTab" className="nav nav-tabs" role="tablist">
              {Object.keys(categories).map((category) => (
                <li role="presentation" className={activeTab === category ? 'active' : ''} key={category}>
                  <a href={`#${category}`} id={`${category}-tab`} role="tab" data-toggle="tab" aria-controls={category} onClick={() => handleTabChange(category)}>
                    {category}
                  </a>
                </li>
              ))}
              <li>{isLoggedIn ? <Link href="/add-card" style={{ backgroundColor: 'lightblue' }}>Add new</Link> : null}</li>
            </ul>
            <div id="myTabContent" className="tab-content">
              {Object.keys(categories).map((category) => (
                <div
                  role="tabpanel"
                  className={`tab-pane fade ${activeTab === category ? 'in active' : ''}`}
                  id={category}
                  aria-labelledby={`${category}-tab`}
                  key={category}
                >
                  <div className="row">
                    {categories[category].map((entry, index) => (
                      <div className="col-md-3 w3layouts_gallery_grid" key={index}>
                        <a title={entry.description} href={entry.image} onClick={(e) => {
                          e.preventDefault();
                          const newTab: any = window.open();
                          newTab.document.body.innerHTML = `<img src="${entry.image}">`;
                        }}>
                          <div className="w3layouts_team_grid">
                            <img src={entry.image} alt={entry.title} className="img-responsive" />
                            <div className="w3layouts_team_grid_pos">
                              <div className="wthree_text">
                                <h4>{entry.title}</h4>
                                <p>{entry.description}</p>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                  <div className="clearfix"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div >

      <h6 style={{ marginTop: '10%' }} className="contact-w3ls">დარეკეთ  <a href="tel:995598863678" style={{ color: 'black' }}>+995 598 863 678</a> დანიშვნის მიზნით</h6>
      <div className="footer-w3layouts">
        <div className="container">
          <div className="col-md-4 footer-grids">
            <h3>Services</h3>
            <ul className="b-nav">
              <li><a className="scroll" href="#home">Home</a></li>
              <li><a className="scroll" href="#about">About</a></li>
              <li><a className="scroll" href="#works">Latest Works</a></li>
              <li><a className="scroll" href="#services">Services</a></li>
            </ul>
          </div>
          <div className="col-md-4 footer-grids">
            <h3>About Fantasy Home</h3>
            <p>
              Fantasy Home Sewing Company blends craftsmanship with creativity, transforming houses into whimsical sanctuaries through luxurious drapes, plush cushions, and bespoke bedding.</p>
            <div className="botton-agileits">
              <a href="#" className="hvr-rectangle-in" data-toggle="modal" data-target="#myModal1">know more</a>
            </div>
            <ul className="agileits_social_list">
              <li><a href="#" className="w3_agile_facebook"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
              <li><a href="#" className="agile_twitter"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
              <li><a href="#" className="w3_agile_dribble"><i className="fa fa-dribbble" aria-hidden="true"></i></a></li>
            </ul>
          </div>
          <div className="col-md-4 footer-grids">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d745.4611332028601!2d42.98788494050479!3d41.637491770343146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4042da8ba661bb2d%3A0x722b4e91a23a9053!2z4YOb4YOU4YOh4YOu4YOU4YOX4YOYIOGDl-GDkOGDo-GDlOGDoOGDmA!5e0!3m2!1sen!2sus!4v1709461031868!5m2!1sen!2sus" width="600" height="450" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
    </>
  );
}
