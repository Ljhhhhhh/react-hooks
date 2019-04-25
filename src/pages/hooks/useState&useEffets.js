import React, { useState, Fragment, useEffect } from "react";
import { Modal, Button } from "antd";

function Hooks() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    // 告诉react再渲染后要做些什么 类似于 componetDidMount componetDidUpdate
    document.title = `you click ${count} times`;
    console.log(123);
  });
  useEffect(() => {
    console.log("just once mount", `you click ${count} times`);
  }, []); // 通过一个空数组，使其只执行一次，相当于 componetDidMount
  return (
    <div>
      <p>you click {count} time</p>
      <button onClick={() => setCount(count + 1)}>click me</button>
      <button onClick={() => setCount(count)}>click me no change</button>
    </div>
  );
}

function Hooks2() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://api.github.com/users")
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      });
  }, []);
  // 渲染两次是因为，初始化的时候，渲染了一次，请求到数据后又请求了一次
  return (
    <Fragment>
      <div className="section">
        {console.log("渲染了两次")}
        {users.map(user => (
          <div key={user.id} className="card">
            <h5>{user.login}</h5>
          </div>
        ))}
      </div>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}>
        Open
      </Button>
      <Modal
        visible={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      />
    </Fragment>
  );
}

const ChatAPI = {
  handle: null,
  isOnline: false,
  login: function() {
    // 做一些登录相关的事情
    // 然后通知订阅的组件
    this.isOnline = true;
    if (this.handle) {
      this.handle({ isOnLine: true });
    }
  },
  logout: function() {
    this.isOnline = false;
    if (this.handle) this.handle({ isOnLine: false });
  },
  subscribeToFriendStatus: function(id, handle) {
    this.handle = handle;
  },
  unsubscribeFromFriendStatus: function (id, handle) {
    console.log(`清理 用户id:${id},`);
    this.handle = null;
  }
};

function FriendStatus(props) {
  const [isOnLine, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    console.log(status.isOnLine);
    setIsOnline(status.isOnLine);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // 注意返回的函数 也被 React 自身获得，并且在组件卸载的时候执行这个函数。
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  }, [props.friend.id]); // 仅当props.friend.id改变时，才会执行

  if (isOnLine === null) {
    return "Loading...";
  }

  return (
    <div>
      {console.log("friend refresh")}
      {isOnLine ? "online" : "offline"}
    </div>
  );
}

function App() {
  const [show, setShow] = useState(true)
  const [userId, setUserId] = useState(1)
  return (
    <div>
      <Hooks />
      <hr />
      <Hooks2 />
      <hr />
      {show ? <FriendStatus friend={{id: userId, name:'张三'}} /> : 'null'}
      <button onClick={()=>setShow(!show)}>显示/关闭</button>
      <button onClick={()=>setUserId(userId+1)}>userid+1</button>
      <button onClick={() => ChatAPI.login()}>登录</button>
      <button onClick={() => ChatAPI.logout()}>退出</button>
    </div>
  );
}

export default App;
