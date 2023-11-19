import SectionTitle from "../../../components/SectionTitle/SectionTitle";

function Payment() {
  return (
    <div>
      <SectionTitle
        heading={`payment`}
        subHeading={`please pay to eat`}
      ></SectionTitle>
      <div>
        <h2 className="text-4xl">taka o phaki tomi aso</h2>
      </div>
    </div>
  );
}

export default Payment;
