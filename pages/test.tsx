import Image from "next/image";
import Layout from "components/layout";
import img from "public/192px.png";
// import vercel from ""

export default function Test() {
  return (
    <Layout>
      <h1>Testing site</h1>
      <div className="card">
        <Image src={img} alt="image" placeholder="blur" />
        <p>Image description</p>
      </div>
      <div className="card">
        <Image src={img} alt="image" placeholder="blur" />
        <p>Image description</p>
      </div>
      <div className="palette">
        <h3>Color Palette</h3>
        <table>
          <tbody>
            <tr>
              <td>Primary</td>
              <td style={{ background: "#4169E1" }}>#4169E1</td>
              <td style={{ background: "#4169E155" }}>#4169E155</td>
            </tr>
            <tr>
              <td>Secondary</td>
              <td style={{ background: "#75AADB" }}>#75AADB</td>
              <td style={{ background: "#75AADB55" }}>#75AADB55</td>
            </tr>
            <tr>
              <td>Accent</td>
              <td style={{ background: "#FCBF49" }}>#FCBF49</td>
              <td style={{ background: "#FCBF4955" }}>#FCBF4955</td>
            </tr>
            <tr>
              <td>Neutral</td>
              <td style={{ background: "#333" }}>#333</td>
              <td style={{ background: "#eee" }}>#eee</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
