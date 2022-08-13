import { useEffect } from "react";
import { useSelector } from "react-redux";
import EditorNav from "../../components/EditorNav/EditorNav";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import { selectPage } from "../../store/page/pageSlice";
import "./index.scss"

const Preview = () => {

  const page = useSelector(selectPage);

  useEffect(() => {
    const previewer = document.getElementById("previewer");
    previewer.innerHTML = page.saveData.html;
  })

  return (
    <div>
      <NavigationBar />
      <div className="Container">
        <div
          id="previewer"
        ></div>
      </div>
    </div>
  )
}

export default Preview;