import React from 'react';
import TreeView from 'devextreme-react/tree-view';
import Sortable from 'devextreme-react/sortable';
import axios from "axios";
import testData2 from './testData2.json'

import service from './testData';


const App = ()=>{
  

  const appConfig = window.globalConfig;
  const [itemsDriveC,setItemsDriveC]=React.useState(service.getItemsDriveC())
  const [itemsDriveD,setItemsDriveD]=React.useState(service.getItemsDriveD())

  const treeViewDriveCRef=React.useRef()
  const treeViewDriveDRef=React.useRef()
  
//   React.useEffect(() => {
//     axios
//       .get(`${appConfig.BaseURL}/api/ProgramPart`)
//       .then((res) => setItemsDriveC(res.data.data));
//   }, []);

    return (
      <div className="form">
        <div className="drive-panel">
          <div className="drive-header dx-treeview-item"><div className="dx-treeview-item-content"><i className="dx-icon dx-icon-activefolder"></i><span>Drive C:</span></div></div>
          <Sortable
            filter=".dx-treeview-item"
            group="shared"
            data="driveC"
            allowDropInsideItem={true}
            allowReordering={true}
            onDragChange={onDragChange}
            onDragEnd={onDragEnd}>
            <TreeView
              id="treeviewDriveC"
              expandNodesRecursive={false}
              dataStructure="plain"
              ref={treeViewDriveCRef}
              items={itemsDriveC}
              width={250}
              height={380}
              displayExpr="name"
            />
          </Sortable>
        </div>
        <div className="drive-panel">
          <div className="drive-header dx-treeview-item"><div className="dx-treeview-item-content"><i className="dx-icon dx-icon-activefolder"></i><span>Drive D:</span></div></div>
          <Sortable
            filter=".dx-treeview-item"
            group="shared"
            data="driveD"
            allowDropInsideItem={true}
            allowReordering={true}
            onDragChange={onDragChange}
            onDragEnd={onDragEnd}>
            <TreeView
              id="treeviewDriveD"
              expandNodesRecursive={false}
              dataStructure="plain"
              ref={treeViewDriveDRef}
              items={itemsDriveD}
              width={250}
              height={380}
              displayExpr="name"
            />
          </Sortable>
        </div>
      </div>
    );
  

  function  treeViewDriveC() {
    return treeViewDriveCRef.current.instance;
  }

  function treeViewDriveD() {
    return treeViewDriveDRef.current.instance;
  }

  function onDragChange(e) {
    if (e.fromComponent === e.toComponent) {
      const fromNode = findNode(getTreeView(e.fromData), e.fromIndex);
      const toNode = findNode(getTreeView(e.toData), calculateToIndex(e));
      if (toNode !== null && isChildNode(fromNode, toNode)) {
        e.cancel = true;
      }
    }
  }

  function onDragEnd(e) {
    if (e.fromComponent === e.toComponent && e.fromIndex === e.toIndex) {
      return;
    }

    const fromTreeView = getTreeView(e.fromData);
    const toTreeView = getTreeView(e.toData);

    const fromNode = findNode(fromTreeView, e.fromIndex);
    const toNode = findNode(toTreeView, calculateToIndex(e));

    if (e.dropInsideItem && toNode !== null && !toNode.itemData.isDirectory) {
      return;
    }

    const fromTopVisibleNode = getTopVisibleNode(e.fromComponent);
    const toTopVisibleNode = getTopVisibleNode(e.toComponent);

    const fromItems = getStateFieldName(e.fromData)==='itemsDriveC'?itemsDriveC:itemsDriveD;
    const toItems = getStateFieldName(e.toData)==='itemsDriveC'?itemsDriveC:itemsDriveD;
    moveNode(fromNode, toNode, fromItems, toItems, e.dropInsideItem);


    getStateFieldName(e.fromData)==='itemsDriveC'&&setItemsDriveC([...fromItems])
    getStateFieldName(e.toData)==='itemsDriveD'&&setItemsDriveD([...toItems])

    
    fromTreeView.scrollToItem(fromTopVisibleNode);
    toTreeView.scrollToItem(toTopVisibleNode);
  }

  function getTreeView(driveName) {
    return driveName === 'driveC'
      ? treeViewDriveC()
      : treeViewDriveD();
  }

  function getStateFieldName(driveName) {
    return driveName === 'driveC'
      ? 'itemsDriveC'
      : 'itemsDriveD';
  }

  function calculateToIndex(e) {
    if (e.fromComponent !== e.toComponent || e.dropInsideItem) {
      return e.toIndex;
    }

    return e.fromIndex >= e.toIndex
      ? e.toIndex
      : e.toIndex + 1;
  }

  function findNode(treeView, index) {
    const nodeElement = treeView.element().querySelectorAll('.dx-treeview-node')[index];
    console.log('nodeElement---',nodeElement)
    if (nodeElement) {
      return findNodeById(treeView.getNodes(), nodeElement.getAttribute('data-item-id'));
    }
    return null;
  }

  function findNodeById(nodes, id) {
    console.log('nodes--------',nodes)
    console.log('id--------',id)
    for (let i = 0; i < nodes.length; i += 1) {
      if (nodes[i].itemData.id === id) {
        return nodes[i];
      }
      if (nodes[i].children) {
        const node = findNodeById(nodes[i].children, id);
        if (node != null) {
          return node;
        }
      }
    }
    return null;
  }

  function moveNode(fromNode, toNode, fromItems, toItems, isDropInsideItem) {

console.log('fromNode---',fromNode)

      console.log(fromItems)
    const fromIndex = fromItems.findIndex((item) => item.id === fromNode.itemData.id);
    fromItems.splice(fromIndex, 1);

    const toIndex = toNode === null || isDropInsideItem
      ? toItems.length
      : toItems.findIndex((item) => item.id === toNode.itemData.id);
    toItems.splice(toIndex, 0, fromNode.itemData);

    moveChildren(fromNode, fromItems, toItems);
    if (isDropInsideItem) {
      fromNode.itemData.parentId = toNode.itemData.id;
    } else {
      fromNode.itemData.parentId = toNode != null
        ? toNode.itemData.parentId
        : undefined;
    }
  }

  function moveChildren(node, fromDataSource, toDataSource) {
    if (!node.itemData.isDirectory) {
      return;
    }

    node.children.forEach((child) => {
      if (child.itemData.isDirectory) {
        moveChildren(child, fromDataSource, toDataSource);
      }

      const fromIndex = fromDataSource.findIndex((item) => item.id === child.itemData.id);
      fromDataSource.splice(fromIndex, 1);
      toDataSource.splice(toDataSource.length, 0, child.itemData);
    });
  }

  function isChildNode(parentNode, childNode) {
    let { parent } = childNode;
    while (parent !== null) {
      if (parent.itemData.id === parentNode.itemData.id) {
        return true;
      }
      parent = parent.parent;
    }
    return false;
  }

  function getTopVisibleNode(component) {
    const treeViewElement = component.element();
    const treeViewTopPosition = treeViewElement.getBoundingClientRect().top;
    const nodes = treeViewElement.querySelectorAll('.dx-treeview-node');
    for (let i = 0; i < nodes.length; i += 1) {
      const nodeTopPosition = nodes[i].getBoundingClientRect().top;
      if (nodeTopPosition >= treeViewTopPosition) {
        return nodes[i];
      }
    }

    return null;
  }
}

export default App;