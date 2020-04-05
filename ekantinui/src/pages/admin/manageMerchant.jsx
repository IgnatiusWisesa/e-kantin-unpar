/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
// class component react
import React, { Component } from "react";
// react-router dom
import { Link, Redirect } from "react-router-dom";
// material-ui styles
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
// import box
import Box from "@material-ui/core/Box";
// button color
import blue from "@material-ui/core/colors/blue";
import lightGreen from "@material-ui/core/colors/lightGreen";
import purple from "@material-ui/core/colors/purple";
// axios
import Axios from "axios";
// modal
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
// input field
import TextField from "@material-ui/core/TextField";

class ManageMerchant extends Component {
  state = {
    datakantin: [],
    loading: true,
    // state foto kantin
    kantinfotoawal:
      "https://cdn1.iconfinder.com/data/icons/school-education-9/24/school_canteen_lunch_canteen_food_fork_school_community_eating-512.png",
    insertfoto: -1,
    // modal tambah kantin
    modaladd: false,
    // add kantin states starts
    addkantinfoto: "",
    addkantinnama: "",
    addkantinlokasi: "",
    addkantintelepon: "",
    addkantinwhatsapp: "",
    addkantindeskripsi: "",
    // add kantin states ends
    // edit kantin states starts
    idedit: -1,
    indexedit: -1,
    modaledit: false,
    editkantinfoto: "",
    editkantinnama: "",
    editkantinlokasi: "",
    editkantintelepon: "",
    editkantinwhatsapp: "",
    editkantindeskripsi: "",
    // edit kantin states ends
  };

  componentDidMount() {
    Axios.get(`http://localhost:2020/kantin`)
      .then((res) => {
        console.log(res.data);
        this.setState({ datakantin: res.data, loading: false });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onClickSave = () => {
    let foto = this.state.addkantinfoto;
    let nama = this.state.addkantinnama;
    let lokasi = this.state.addkantinlokasi;
    let telepon = this.state.addkantintelepon;
    let whatsapp = this.state.addkantinwhatsapp;
    let deskripsi = this.state.addkantindeskripsi;

    let kantinbaru = {
      foto,
      nama,
      lokasi,
      telepon,
      whatsapp,
      deskripsi,
    };

    Axios.post(`http://localhost:2020/kantin`, kantinbaru)
      .then((res) => {
        console.log(res.data);
        Axios.get(`http://localhost:2020/kantin`)
          .then((res1) => {
            console.log(res1.data);
            this.setState({ datakantin: res1.data, modaladd: false });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onClickDelete = (id, index) => {
    console.log(id, index);

    Axios.delete(`http://localhost:2020/kantin/${id}`)
      .then((res) => {
        console.log(res.data);
        Axios.get(`http://localhost:2020/kantin`)
          .then((res1) => {
            console.log(res1.data);
            this.setState({ datakantin: res1.data, modaladd: false });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onClickEdit = () => {
    // id dan index edit
    let id = this.state.idedit;
    let index = this.state.indexedit;

    let nama = this.state.editkantinnama || this.state.datakantin[id].nama;
    let lokasi = this.state.editkantinlokasi || this.state.datakantin[id].lokasi;
    let whatsapp = this.state.editkantinwhatsapp || this.state.datakantin[id].whatsapp;
    let deskripsi = this.state.editkantindeskripsi || this.state.datakantin[id].deskripsi;

    let kantinedit = {
      nama,
      lokasi,
      whatsapp,
      deskripsi,
    };

    console.log(kantinedit);

    Axios.put(`http://localhost:2020/kantin/${id}`, kantinedit)
      .then((res) => {
        console.log(res.data);
        Axios.get(`http://localhost:2020/kantin`)
          .then((res1) => {
            console.log(res1.data);
            this.setState({ datakantin: res1.data, modaledit: false });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onEditPhoto = (e) => {
    console.log(e.target.files[0]);
  };

  renderkantin = () => {
    return this.state.datakantin.map((val, index) => {
      return (
        <TableRow key={index}>
          <TableCell style={{ width: "50px" }}>{val.id}</TableCell>
          {this.state.insertfoto === val.id ? (
            <TableCell style={{ width: "300px" }}>
              <Button variant="contained" component="label">
                Upload File
                <input type="file" style={{ display: "none" }} onChange={(e) => this.onEditPhoto(e)} />
              </Button>
            </TableCell>
          ) : (
            <TableCell style={{ width: "300px" }}>
              <img
                className="card-img-top"
                style={{ height: "200px", width: "300px" }}
                src={val.foto || this.state.kantinfotoawal}
                alt="Canteen's Photo"
                onClick={() => {
                  this.setState({ insertfoto: val.id });
                }}
              />
            </TableCell>
          )}
          <TableCell>
            <TableBody>
              <TableRow>
                Nama <a style={{ paddingLeft: "30px" }}>: {val.nama}</a>
              </TableRow>
              <TableRow>
                Lokasi <a style={{ paddingLeft: "27px" }}>: {val.lokasi}</a>
              </TableRow>
              <TableRow>
                Whatsapp <a style={{ paddingLeft: "6px" }}>: {val.whatsapp}</a>
              </TableRow>
              <TableRow>
                Deskripsi <a style={{ paddingLeft: "12px" }}>: {val.deskripsi}</a>
              </TableRow>
            </TableBody>
          </TableCell>
          <TableCell>
            <TableBody>
              <TableRow>
                <Box mb={1}>
                  <Button
                    onClick={() => this.setState({ idedit: val.id, indexedit: index, modaledit: true })}
                    variant="outlined"
                    style={{ width: "150px", color: purple.A200 }}>
                    Edit Profile
                  </Button>
                </Box>
              </TableRow>
              <TableRow>
                <Box mb={1}>
                  <Link to={"/managemenus/" + val.id}>
                    <Button variant="outlined" style={{ width: "150px", color: blue.A200 }}>
                      Detail Menu
                    </Button>
                  </Link>
                </Box>
              </TableRow>
              <TableRow>
                <Button
                  onClick={() => this.onClickDelete(val.id, index)}
                  variant="outlined"
                  style={{ width: "150px" }}
                  color="secondary">
                  Delete
                </Button>
              </TableRow>
            </TableBody>
          </TableCell>
        </TableRow>
      );
    });
  };

  render() {
    if (this.state.loading) {
      return (
        <div>
          <div class="loading">Loading&#8230;</div>
        </div>
      );
    }

    return (
      <div>
        {this.state.modaladd ? (
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={true}
            onClose={() => {
              this.setState({ modaladd: false });
            }}
            closeAfterTransition
            BackdropComponent={Backdrop}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            BackdropProps={{
              timeout: 500,
            }}>
            <Fade in={true}>
              <div
                style={{
                  background: "white",
                  padding: "10px",
                  width: "500px",
                }}>
                <Box ml={20}>
                  <h2 id="transition-modal-title">Input Kantin</h2>
                </Box>
                <Box mb={1}>
                  <TextField
                    onChange={(e) => this.setState({ addkantinnama: e.target.value })}
                    label="Canteen's Name"
                    style={{ margin: 4 }}
                    placeholder="Nama"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                </Box>
                <Box mb={1}>
                  <TextField
                    onChange={(e) => this.setState({ addkantinlokasi: e.target.value })}
                    label="Canteen's Location"
                    style={{ margin: 4 }}
                    placeholder="Lokasi"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                </Box>
                <Box mb={1}>
                  <TextField
                    onChange={(e) => this.setState({ addkantinwhatsapp: e.target.value })}
                    label="Canteen's Whatsapp Number"
                    style={{ margin: 4 }}
                    placeholder="0895 - 804 - xxx"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                </Box>
                <Box mb={1}>
                  <TextField
                    onChange={(e) => this.setState({ addkantindeskripsi: e.target.value })}
                    label="Canteen's Description"
                    style={{ margin: 4 }}
                    placeholder="Deskripsi"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                </Box>
                <Box ml={20}>
                  <Button onClick={this.onClickSave} variant="outlined" style={{ width: "150px", color: lightGreen.A700 }}>
                    Save
                  </Button>
                </Box>
              </div>
            </Fade>
          </Modal>
        ) : null}
        {this.state.modaledit ? (
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={true}
            onClose={() => {
              this.setState({ modaledit: false });
            }}
            closeAfterTransition
            BackdropComponent={Backdrop}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            BackdropProps={{
              timeout: 500,
            }}>
            <Fade in={true}>
              <div
                style={{
                  background: "white",
                  padding: "10px",
                  width: "500px",
                }}>
                <Box ml={20}>
                  <h2 id="transition-modal-title">Edit Kantin</h2>
                </Box>
                <Box mb={1}>
                  <TextField
                    onChange={(e) => this.setState({ editkantinnama: e.target.value })}
                    label="Canteen's Name"
                    style={{ margin: 4 }}
                    defaultValue={this.state.datakantin[this.state.indexedit].nama}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                </Box>
                <Box mb={1}>
                  <TextField
                    onChange={(e) => this.setState({ editkantinlokasi: e.target.value })}
                    label="Canteen's Location"
                    style={{ margin: 4 }}
                    defaultValue={this.state.datakantin[this.state.indexedit].lokasi}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                </Box>
                <Box mb={1}>
                  <TextField
                    onChange={(e) => this.setState({ editkantinwhatsapp: e.target.value })}
                    label="Canteen's Whatsapp Number"
                    style={{ margin: 4 }}
                    defaultValue={this.state.datakantin[this.state.indexedit].whatsapp}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                </Box>
                <Box mb={1}>
                  <TextField
                    onChange={(e) => this.setState({ editkantindeskripsi: e.target.value })}
                    label="Canteen's Description"
                    style={{ margin: 4 }}
                    defaultValue={this.state.datakantin[this.state.indexedit].deskripsi}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                </Box>
                <Box ml={20}>
                  <Button onClick={this.onClickEdit} variant="outlined" style={{ width: "150px", color: purple.A200 }}>
                    Save
                  </Button>
                </Box>
              </div>
            </Fade>
          </Modal>
        ) : null}

        <Paper style={{ width: "100%" }}>
          <TableContainer style={{ maxHeight: 620 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>ID.</TableCell>
                  <TableCell>Foto</TableCell>
                  <TableCell>Profil</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <Box mb={1} mt={1} style={{ paddingLeft: "30vh" }}>
                      <Button
                        onClick={() => {
                          this.setState({ modaladd: true });
                        }}
                        variant="outlined"
                        style={{ width: "150px", color: lightGreen.A700 }}>
                        Tambah Kantin
                      </Button>
                    </Box>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
              <TableBody>{this.renderkantin()}</TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    );
  }
}

export default ManageMerchant;
