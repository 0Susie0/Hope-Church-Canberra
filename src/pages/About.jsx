import React from 'react';

const PageHeader = ({ title, subtitle, backgroundImage }) => (
  <div className="relative bg-gray-900 py-32">
    {/* Background image with overlay */}
    {backgroundImage && (
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
        <img 
          src={backgroundImage} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
    )}
    
    {/* Content */}
    <div className="container mx-auto px-4 text-center text-white relative z-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{title}</h1>
      <p className="text-xl max-w-3xl mx-auto text-gray-100">{subtitle}</p>
    </div>
  </div>
);

const OurVision = () => (
  <div className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">Our Vision</h2>
        <div className="w-20 h-1 bg-black mx-auto mb-6"></div>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-50 p-8 rounded-lg shadow-md">
          <p className="text-xl text-center text-justify text-gray-800 mb-6">
            Fulfilling the Great Commission by raising Christ-centred Disciples to plant Vibrant, Bible based Churches in Canberra, Australia and all over the world
          </p>
        </div>
      </div>
    </div>
  </div>
);

const TheExtendedFamily = () => (
  <div className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2 text-black">The Extended Family</h2>
        <div className="w-20 h-1 bg-black mx-auto mb-6"></div>
      </div>
      <div className="max-w-5xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md flex flex-col md:flex-row items-center gap-8 border border-black">
          <div className="md:w-1/2 w-full">
            <img 
              src="/images/Hope Oceania.png" 
              alt="Hope Oceania Logo" 
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>
          <div className="md:w-1/2 w-full flex flex-col justify-center">
            <h3 className="text-2xl font-semibold mb-4 text-black">Hope Oceania & International</h3>
            <p className="text-gray-800 mb-4 text-justify leading-relaxed">
              Hope Church Canberra is part of a global family of vibrant, Bible-based churches:
            </p>
            <div className="mb-2">
              <a href="https://www.himoceania.org/" target="_blank" rel="noopener noreferrer" className="block text-lg font-bold text-black underline hover:text-gray-700 transition mb-1">Hope Oceania</a>
              <span className="text-gray-700 text-base block mb-2">(Australia & Oceania region)</span>
            </div>
            <div>
              <a href="https://www.byhim.org/" target="_blank" rel="noopener noreferrer" className="block text-lg font-bold text-black underline hover:text-gray-700 transition mb-1">Hope International Ministries</a>
              <span className="text-gray-700 text-base block">(Global movement)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CoreValues = () => (
  <div className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">Core Values</h2>
        <div className="w-20 h-1 bg-black mx-auto mb-6"></div>
        <p className="text-gray-700 max-w-4xl mx-auto mb-8 text-justify">
          We are Christ-centred, Holy Spirit empowered, Bible based and covenantal people;
          a life-enriching community, who are vision driven disciple makers, leadership trainers and
          church planters who belong to an apostolic movement.
        </p>
      </div>
      
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full border-t-4 border-gray-800">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Christ-Centred</h3>
            <p className="text-gray-700 flex-grow">
              We believe Christ is central to who we are and what we do. This applies to each believer and the church as a whole. All that we are and all that we do is for His glory. We are committed to helping our members develop an intimate and meaningful relationship with Christ through prayer; a relationship that leads to hope, purpose and fulfilment.
            </p>
            <div className="mt-4 text-sm text-gray-500 italic">
              [Colossians 1:17, Ephesians 1:22-23, Ephesians 4:13]
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full border-t-4 border-gray-800">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Holy Spirit Empowered</h3>
            <p className="text-gray-700 flex-grow">
              We believe in the importance of being Spirit-filled and Spirit-led. We emphasise reliance on the Holy Spirit in every facet of our personal and church life. It is through the God's Spirit that life transformation occurs and every spiritual gift mentioned in God's Word can be and should be manifested today.
            </p>
            <div className="mt-4 text-sm text-gray-500 italic">
              [Zechariah 4:6, Acts 1:8, Galatians 5:16-18]
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full border-t-4 border-gray-800">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Bible Based</h3>
            <p className="text-gray-700 flex-grow">
              We believe our faith and practice as Christians is founded and built upon biblical principles. We emphasise expository preaching and balanced comprehensive teaching so that our members may understand, live out and mature in the Christian life as God intended.
            </p>
            <div className="mt-4 text-sm text-gray-500 italic">
              [2 Timothy 3:16-17, Nehemiah 8:8, James 1:22]
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full border-t-4 border-gray-800">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Covenantal Relationships</h3>
            <p className="text-gray-700 flex-grow">
              We believe that God is a covenantal God. He seeks people who are committed to Him and His purpose, and with one another. We believe an appropriate response to God's covenant involves loving, honouring and worshipping Him above all else.
            </p>
            <div className="mt-4 text-sm text-gray-500 italic">
              [Genesis 1:1, Ephesians 1:3-10, 1 John 4:13-21]
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full border-t-4 border-gray-800">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Enriching Community Life</h3>
            <p className="text-gray-700 flex-grow">
              We believe the church is a life-enriching community. We are committed to building an authentic and biblical community that unconditionally loves and effectively enfolds people of all cultures and backgrounds. We seek to create an encouraging community that supports each other towards their fullest potential.
            </p>
            <div className="mt-4 text-sm text-gray-500 italic">
              [Galatians 6:2, 10, Acts 2:42-46]
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full border-t-4 border-gray-800">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Vision Driven</h3>
            <p className="text-gray-700 flex-grow">
              We believe in the importance of a God given, biblical vision that requires nothing less than our obedience to fulfilling the entirety of God's vision for the church. We are passionate with the vision to fulfil the Great Commission by raising Christ-centred disciples to plant vibrant biblical churches within every area of all nations in the world.
            </p>
            <div className="mt-4 text-sm text-gray-500 italic">
              [Proverbs 29:18, Habakkuk 2:2, Matthew 28:19-20]
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full border-t-4 border-gray-800">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Disciple Making</h3>
            <p className="text-gray-700 flex-grow">
              We believe the core command of the Great Commission is to make Disciples of Christ. We aim to raise disciples who are passionate for God, people and the Great Commission. We aim to raise disciples who continually grow in Christ-like attitudes, values and Kingdom-focused lifestyle.
            </p>
            <div className="mt-4 text-sm text-gray-500 italic">
              [Matthew 28:18-20, Romans 8:29, 1 Corinthians 11:1]
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full border-t-4 border-gray-800">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Leadership Development</h3>
            <p className="text-gray-700 flex-grow">
              We believe that every Christ follower has leadership potential. We are committed to helping every member discover and realise this potential for God's glory. To this end, we place a high priority in inspiring, equipping and empowering every member to effectively undertake the work of the ministry as well as grow in leadership.
            </p>
            <div className="mt-4 text-sm text-gray-500 italic">
              [Matthew 9:37-38, Ephesians 4:11-13, Hebrews 13:20-21]
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full border-t-4 border-gray-800">
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Church Planting</h3>
            <p className="text-gray-700 flex-grow">
              We are committed to help every person experience the privilege of a life-changing personal relationship under the Lordship of Jesus. As part of this, we are committed to empowering members to share their faith and impact their communities. We believe that every believer has a part to play in world-missions.
            </p>
            <div className="mt-4 text-sm text-gray-500 italic">
              [Isaiah 52:7, Luke 4:18-19, Ephesians 3:10]
            </div>
          </div>
        </div>
        
        <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-6 text-center text-gray-900">Statement of Faith</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h5 className="text-lg font-medium mb-2 text-gray-800 border-l-4 border-gray-800 pl-3">THE BIBLE</h5>
              <p className="text-gray-700 mb-6 text-justify">
                We believe in every word of the Old and New Testaments as originally given, and that God inspired humans to write it without error. The Bible is the Word of God. It is the absolute truth and therefore is the standard of faith as well as the ultimate handbook for every aspect in a believer's life.
              </p>
              
              <h5 className="text-lg font-medium mb-2 text-gray-800 border-l-4 border-gray-800 pl-3">GOD</h5>
              <p className="text-gray-700 mb-6 text-justify">
                We believe in the one true and eternal God, the Creator of everything. God is one but exists in three persons: the Father, the Son and the Holy Spirit. Though they are co-equal, coexistent and co-eternal, they play different roles in human history, working together in creation, revelation, redemption and the final judgment.
              </p>
              
              <h5 className="text-lg font-medium mb-2 text-gray-800 border-l-4 border-gray-800 pl-3">JESUS CHRIST</h5>
              <p className="text-gray-700 mb-6 text-justify">
                We believe in Jesus Christ, the Son of God, who was supernaturally conceived by the power of the Holy Spirit and born of the virgin Mary. Whilst on earth, He was both perfectly God and perfectly man at the same time, and was without sin. He was crucified on the cross and physically rose from the dead on the third day to fulfil the will of the Father to provide salvation from sin to those who believe in Him.
              </p>
              
              <h5 className="text-lg font-medium mb-2 text-gray-800 border-l-4 border-gray-800 pl-3">HOLY SPIRIT</h5>
              <p className="text-gray-700 mb-6 text-justify">
                We believe that the Holy Spirit is God who convicts people of sin and leads them to repent of their sin and place their faith in Jesus for salvation. He dwells within believers to enable them to lead holy lives and obey God's will. We believe that all the gifts of the Holy Spirit mentioned in the Bible remain in the Church today and should be fully exercised to build up the Body of Christ.
              </p>
            </div>
            
            <div>
              <h5 className="text-lg font-medium mb-2 text-gray-800 border-l-4 border-gray-800 pl-3">SALVATION</h5>
              <p className="text-gray-700 mb-6 text-justify">
                We believe that we can be saved from God's wrath when we confess and repent from sin and place our trust in Jesus Christ. Salvation is given by the grace of God only on the basis of Jesus' sacrifice for sin when He died on the cross and cannot be achieved by a person's own works. At the point of salvation, an individual becomes a new creation in Christ.
              </p>
              
              <h5 className="text-lg font-medium mb-2 text-gray-800 border-l-4 border-gray-800 pl-3">THE CHURCH</h5>
              <p className="text-gray-700 mb-6 text-justify">
                We believe that the church is the community of God's people and central to God's plan of salvation. Once we become Christians, we are adopted into God's family and become part of the Universal Church, made up of Christians of every age. Local churches are made up of believers who regularly meet together in different localities to worship, listen to the Word of God, fellowship, witness, participate in communion, pray and have other activities together.
              </p>
              
              <h5 className="text-lg font-medium mb-2 text-gray-800 border-l-4 border-gray-800 pl-3">BAPTISM AND COMMUNION</h5>
              <p className="text-gray-700 mb-6 text-justify">
                We believe that all Christians should be water baptized in obedience to Jesus' command and as a public testimony of their commitment to follow Him. Water baptism is the immersion of a person completely in water as a symbol of the death, burial and resurrection of Jesus. Communion is for Christians to remember Jesus by partaking of bread and wine as symbols of the flesh and blood of Jesus and the covenant God has made to bring salvation through faith in Christ.
              </p>
              
              <h5 className="text-lg font-medium mb-2 text-gray-800 border-l-4 border-gray-800 pl-3">WORSHIP</h5>
              <p className="text-gray-700 mb-6 text-justify">
                We believe that Christians must worship the Lord in spirit and in truth. Worship is acknowledging the worthiness of God and opening our hearts to relate to Him. Worshiping according to Biblical patterns allows us to use outward expression to come close to God. Some of these expressions of worship include worshiping with other Christians, using musical instruments, singing and exercising the gifts of the Holy Spirit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const OurLeaders = () => (
  <div className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">Our Leaders</h2>
        <div className="w-20 h-1 bg-black mx-auto mb-6"></div>
      </div>
      
      <div className="max-w-5xl mx-auto">
        <div className="bg-gray-50 p-8 rounded-lg shadow-md flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <img 
              src="/images/Leaders.jpg" 
              alt="Patrick & Sarah Ching" 
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>
          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold mb-2">Local Pastor: Patrick & Sarah Ching</h3>
            <p className="text-gray-700 mb-4 text-justify">
              Patrick & Sarah have been serving in Hope Churches for more than 15 years. They relocated to Canberra in 2012 and took over the leadership of the church at the beginning of 2014. Patrick is also working as an IT Professional and Sarah is a stay home mum taking care of their boys, David and Gabriel.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const About = () => {
  return (
    <div>
      <PageHeader 
        title="About Us" 
        subtitle="Learn about our vision, values, and leadership at Hope Church Canberra"
        backgroundImage="/images/Congregation.jpg"
      />
      <OurVision />
      <OurLeaders />
      <TheExtendedFamily />
      <CoreValues />
      
    </div>
  );
};

export default About; 