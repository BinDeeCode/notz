import React from "react";
import ReactDOM from "react-dom";
import "flexboxgrid2";
import { Card, Button, Input, Icon, Skeleton } from "antd";
import styled from "styled-components";
import axios from "axios";
import qs from "qs";

const Column = styled.div`
  width: 100%;
  height: 200vh;
`;

const H3 = styled.h3`
  margin-top: 30px;
`;

class App extends React.Component {
  handleChange = key => {
    console.log(key);
  };
  state = {
    data: [{ title: "hello" }],
    note: {
      title: "Ошибка",
      body: "Нет соединения с сервером"
    },
    isLoaded: false
  };

  handleDelete = (id, array, index) => {
    axios
      .delete("https://demo-api-apxmweuljq.now.sh/notes/" + id)
      .then(() => {
        console.log(array, index);

        array.splice(index, 1);

        this.setState({ data: array });
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  getAPIdata = () => {
    axios
      .get("https://demo-api-apxmweuljq.now.sh/notes")
      .then(response => {
        this.setState({ data: response.data, isLoaded: true }, function() {});
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  componentDidMount = () => {
    this.getAPIdata();
  };

  handlePOST = e => {
    let localTitle = ReactDOM.findDOMNode(this.refs.titleInput).value;
    let localText = ReactDOM.findDOMNode(this.refs.textAreaInput).value;

    ReactDOM.findDOMNode(this.refs.titleInput).value = "";
    ReactDOM.findDOMNode(this.refs.textAreaInput).value = "";

    let url = "https://demo-api-apxmweuljq.now.sh/notes";

    if (localText !== "" && localTitle !== "") {
      let data = { title: localTitle, text: localText };

      const options = {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(data),
        url
      };

      axios(options).then(() => {
        this.getAPIdata();
      });
    } else {
      alert("Заполните поля");
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xl-3 col-lg-3 col-xs-12" />
          <div className="col-xl-6 col-lg-6 col-xs-12">
            <Column>
              <H3>NOTEZ</H3>
              <Input
                ref="titleInput"
                size="large"
                placeholder="Введите заголовок заметки"
              />

              <Input.TextArea
                ref="textAreaInput"
                style={{ height: 150, marginTop: 10 }}
                placeholder="Введите текст заметки"
              />
              <Button
                onClick={this.handlePOST}
                type="primary"
                style={{ marginTop: 10 }}
              >
                Добавить
              </Button>
              {this.state.isLoaded ? (
                this.state.data.map((currentValue, index, array) => {
                  return (
                    <Card
                      style={{
                        marginTop: 20,
                        marginBottom: 10
                      }}
                      key={index}
                      title={currentValue.title}
                      extra={
                        <Button
                          onClick={() =>
                            this.handleDelete(currentValue._id, array, index)
                          }
                          shape="circle"
                        >
                          <Icon type="delete" theme="twoTone" />
                        </Button>
                      }
                    >
                      {currentValue.text}
                    </Card>
                  );
                })
              ) : (
                <div>
                  <Card
                    style={{
                      marginTop: 20,
                      marginBottom: 10
                    }}
                  >
                    <Skeleton loading={true}>Loading</Skeleton>
                  </Card>
                  <Card
                    style={{
                      marginTop: 20,
                      marginBottom: 10
                    }}
                  >
                    <Skeleton loading={true}>Loading</Skeleton>
                  </Card>
                  <Card
                    style={{
                      marginTop: 20,
                      marginBottom: 10
                    }}
                  >
                    <Skeleton loading={true}>Loading</Skeleton>
                  </Card>
                </div>
              )}
            </Column>
          </div>
          <div className="col-xl-3 col-lg-3 col-xs-12" />
        </div>
      </div>
    );
  }
}

export default App;
