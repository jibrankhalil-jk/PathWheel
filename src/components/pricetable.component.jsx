import React from "react"; 

function 
PriceTable() {
  
  return (
    <section className="container mt-28 text-center">
      <h3 className="text-[32px] font-bold">Price Table</h3>
      <p className="font-medium">We offer competitive price</p>

      <div className="mt-11 grid gap-8 md:gap-5 md:grid-cols-3 lg:gap-8 xl:gap-16 justify-center">
        <PriceCard
          title="Free"
          description="Brief price description"
          price="0"
          operators = "2"
        />
        <PriceCard
          title="Standard"
          description="Brief price description"
          price="5"
          operators = "5+"
        />
        <PriceCard
          title="Premium"
          description="Brief price description"
          price="10"
          operators = "10+"
        />
      </div>
    </section>
  );
}

function PriceCard({ title, description, price, operators }) {
  const features = [
    `${operators} Operators`,
    "Notifications",
    "Landing Pages",
  ];
  return (
    <div className="border min-w-[80vw] sm:min-w-[400px] md:min-w-full group even:bg-primary even:text-white flex flex-col items-center rounded-xl shadow-borderShadow">
      <h4 className="mt-6 font-bold text-2xl">{title}</h4>
      <p className="mt-2">{description}</p>

      <div className="mt-6 flex items-center">
        <p className="text-7xl text-primary group-even:text-white font-bold">{price}</p>
        <div className="ml-2 flex flex-col items-start">
          <p className="text-primary group-even:text-white font-bold text-2xl">$</p>
          <p className="text-[#AFAFAF] group-even:text-[#E0E0E0] -mt-1">Per / month</p>
        </div>
      </div>

      <div className="mt-5">
        {features.map((feature) => (
          <p key={feature} className="mt-4">{feature}</p>
        ))}
      </div>

      <button className="primary-button mt-9 mb-8 group-even:primary-button-white rounded-lg">Order Now</button>
    </div>
  );
}


export default PriceTable;
