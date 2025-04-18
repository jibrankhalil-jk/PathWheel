
import React from "react";

function Feature({ Icon, iconBgColor, title, description }) {
    return (
        <div className="flex flex-col text-center sm:text-left">
            <div style={{ background: `${iconBgColor}` }}
                className="h-12 w-12 rounded-[19px] m-auto flex justify-center items-center drop-shadow-md sm:ml-0">
                <i className={Icon + ` h-6 mb-1 text-white`} />
            </div>
            <h4 className="mt-6 font-semibold text-2xl">{title}</h4>
            <p className="text-base mt-2">{description}</p>
        </div>
    );
}

function Features() {
    return (
        <section className="container mt-24 flex flex-col items-center">
            <h2 className="text-[32px] font-bold text-center sm:text-left">
                Product was Built Specifically for You
            </h2>

            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-12">

                <Feature
                    Icon="fi fi-tr-snap"
                    title="Easy to Use"
                    iconBgColor="#02897A"
                    description="Designed for simplicity—no complex setup or learning curve needed."
                />
                <Feature
                    Icon="fi fi-rr-shield-check"
                    iconBgColor="#4D8DFF"
                    title="Safe & Secure"
                    description="Built-in safety features give you confidence on every journey."
                />
                <Feature
                    Icon="fi fi-tr-couch"
                    iconBgColor="#740A76"
                    title="Comfortable Ride"
                    description="Ergonomic design ensures smooth and relaxing mobility all day long."
                />
                <Feature
                    Icon="fi fi-tr-plug-connection"
                    iconBgColor="#F03E3D"
                    title="Always Connected"
                    description="Stay in control with smart connectivity options at your fingertips."
                />
            </div>

            <button className="primary-button mt-14">Sign up Now</button>

        </section>
    );
}

export default Features;
