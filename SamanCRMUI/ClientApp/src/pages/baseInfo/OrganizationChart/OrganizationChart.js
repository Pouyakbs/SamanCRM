import React, { useEffect } from "react";
import axios from "axios";
import Diagram, {
  Nodes,
  AutoLayout,
  Editing,
  Toolbox,
  Group,
  CustomShape,
} from "devextreme-react/diagram";
import "../../../style.css";
import ArrayStore from "devextreme/data/array_store";
import CustomShapeTemplate from "./CustomShapeTemplate.js";
import service from "./data.js";

export const OrganizationChart = () => {
  const appConfig = window.globalConfig;
  const [datasource, setDataSource] = React.useState([]);
  const [roleData, setRoleData] = React.useState([]);

  const [fullDatasource, setFullDataSource] = React.useState([]);


  const customShapeTemplateSvg = (item) => {
  
    return (
      <svg className="template">
        <text className="template-name" x="35%" y="40%">
          {item.roleName}
        </text>
        <text className="template-title" x="35%" y="70%">
          {item.name} {item.surname}
        </text>
      </svg>
    );
  };
  const itemTypeExpr = (obj) => {
    return `employee${obj.personnelID}`;
  };
  useEffect(() => {
    
    axios
      .get(`${appConfig.BaseURL}/api/PersonnelWithRoles`)
      .then((res) => {
     
        setDataSource(res.data.data)
      });
      axios
        .get(`${appConfig.BaseURL}/api/ApplicationRole`)
        .then((res) => {
          setRoleData(res.data.data)
          }
        );
        
        

  }, []);

  useEffect(()=>{
    if(datasource.length && roleData.length){
      let arr=[]
      roleData.forEach((item)=>{
        let temp=datasource.filter(d=>d.roleID==item.roleID)
        
        if(temp.length==0){
          arr.push({
            name :  "",
            nickName:"",
            parentID : item.parentID,
            personnelID : Math.random() * 1000,
            roleID : item.roleID,
            roleName : item.roleName,
            surname : "",
            workingUnit : ""
          })
        }
      })
    
      setFullDataSource([...datasource,...arr])

    }

  },[roleData,datasource])

  console.log('fullDatasource---',fullDatasource)
  

  function customShapeTemplate(item) {
    console.log("item customShapeTemplate", item);
    return customShapeTemplateSvg(item.dataItem);
  }

 

  return (
    <div id="container">
      <Diagram
        id="diagram"
        customShapeRender={customShapeTemplate}
        readOnly={true}
        showGrid={false}
        simpleView={true}
        height={"800px"}
      >
        {fullDatasource.map((employee, index) => (
         
          <CustomShape
          type={`employee${employee.personnelID}`}
          baseType="cardWithImageOnRight"
          defaultWidth={1.7}
          defaultHeight={0.7}
          allowEditText={false}
          key={index}
        />
        ))}
        <Nodes
          dataSource={fullDatasource}
          keyExpr="personnelID"
          typeExpr={itemTypeExpr}
          parentKeyExpr="parentID"
        >
          <AutoLayout orientation="vertical" type="tree" />
        </Nodes>
      </Diagram>
    </div>
  );
};

export default OrganizationChart;
