import React from "react";


function Benefits({ }) {
  return (
    <section className="container mt-24 space-y-24">
      <BenefitItem
        image="./images/wheelchair_illustration.svg"
        heading1="Effortless Mobility for"
        heading2="Families"
        description="Peace of mind knowing your loved one is safe, mobile, and in control of their freedom."
        Content={() => (
          <div>
            <h5 className="mt-6 mb-2 font-semibold">Healthcare Providers</h5>
            <p>
              Enhance patient independence while reducing physical strain on staff and resources.
            </p>
            <h5 className="mt-6 mb-2 font-semibold">Caregivers</h5>
            <p>
              Spend less time assisting and more time connecting, with built-in safety and autonomy.
            </p>
          </div>
        )}
      />

      <BenefitItem
        image="./images/suport.jpg"
        heading1="Easier decision making for"
        heading2="Customers"
        description="No more second-guessing—our wheelchair is designed to be intuitive, safe, and truly empowering"
        Content={() => (
          <div className="flex flex-col space-y-6">
            <CheckedItem
              bgColor="#FF9900"
              text="Never worry about complicated controls or confusing features again."
            />
            <CheckedItem
              bgColor="#F03E3D"
              text="We focus on real-world usability, so you get freedom without frustration."
            />
            <CheckedItem
              bgColor="#4D8DFF"
              text="Your independence, comfort, and confidence come first—always."
            />
          </div>
        )}
      />

      {/* <BenefitItem
        image="./images/benefit-3.svg"
        heading1="Optimisation for"
        heading2="Collaborative"
        description="Few would argue that, despite the advancements of feminism over the past three decades, women still face a double standard when it comes to their behavior. "
        Content={() => (
          <div>
            <h5 className="mt-6 mb-2 font-semibold">Accessory makers</h5>
            <p>
              While most people enjoy casino gambling, sports betting, lottery
              and bingo playing for the fun
            </p>
            <h5 className="mt-6 mb-2 font-semibold">Alterationists</h5>
            <p>
              If you are looking for a new way to promote your business that
              won’t cost you more money,
            </p>
          </div>
        )}
      /> */}
    </section>
  );
}

export default Benefits;

function CheckedItem({ bgColor, text }) {
  return (
    <div>
      <div className="flex items-center space-x-6">
        <div style={{ background: `${bgColor}` }} className="rounded-xl p-1.5">
          <i className="fa fa-br-sd h-8 text-white" />
        </div>
        <p>{text}</p>
      </div>
    </div>
  );
}



function BenefitItem({ image, heading1, heading2, description, Content }) {
  return (
    <div className="md:flex flex-row-reverse even:flex-row justify-between items-center">
      <div className="md:max-w-[30%]">
        <img src={image} alt={heading2} />
      </div>

      <div className="text-left md:max-w-[40%] mt-14 md:mt-0">
        <p className="font-semibold text-base">{heading1}</p>
        <h1 className="font-bold text-4xl leading-[60px]">{heading2}</h1>
        <p className="my-4">{description}</p>
        <Content />
      </div>
    </div>
  );
}