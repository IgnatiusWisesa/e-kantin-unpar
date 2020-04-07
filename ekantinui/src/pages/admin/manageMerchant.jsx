/* eslint-disable jsx-a11y/anchor-is-valid */
// class component react
import React, { Component } from "react";
// react-router dom
import { Link } from "react-router-dom";
// material-ui styles
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
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

import { APIURL } from "../../helpers/APIURL";

class ManageMerchant extends Component {
  state = {
    datakantin: [],
    loading: true,
    // state foto kantin
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
    // paging
    pager: {},
    pageOfItems: [],
  };

  componentDidMount() {
    Axios.post(`${APIURL}/admin/stand`)
      .then((res) => {
        this.setState({
          datakantin: res.data.standResult,
          pager: res.data.pager,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onClickSave = () => {
    let nama = this.state.addkantinnama;
    let lokasi = this.state.addkantinlokasi;
    let whatsapp = this.state.addkantinwhatsapp;

    let kantinbaru = {
      standName: nama,
      standContact: lokasi,
      standAddress: whatsapp,
    };

    Axios.post(`${APIURL}/admin/add-stand`, kantinbaru)
      .then((res) => {
        Axios.post(`${APIURL}/admin/stand`)
          .then((res) => {
            this.setState({
              datakantin: res.data.standResult,
              pager: res.data.pager,
              modaladd: false,
            });
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
    Axios.post(`${APIURL}/admin/delete-stand`, { profileId: id })
      .then((res) => {
        Axios.post(`${APIURL}/admin/stand`)
          .then((res) => {
            this.setState({
              datakantin: res.data.standResult,
              pager: res.data.pager,
            });
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

    let nama = this.state.editkantinnama || this.state.datakantin[index].standName;
    let lokasi = this.state.editkantinlokasi || this.state.datakantin[index].standAddress;
    let whatsapp = this.state.editkantinwhatsapp || this.state.datakantin[index].standContact;
    // let deskripsi = this.state.editkantindeskripsi || this.state.datakantin[id].deskripsi;

    let kantinedit = {
      profileId: id,
      standName: nama,
      standAddress: lokasi,
      standContact: whatsapp,
    };

    Axios.post(`${APIURL}/admin/edit-stand-profile`, kantinedit)
      .then((res) => {
        Axios.post(`${APIURL}/admin/stand`)
          .then((res) => {
            this.setState({
              datakantin: res.data.standResult,
              pager: res.data.pager,
              modaledit: false,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onEditPhoto = (e, id) => {
    var formdata = new FormData();

    let foto = e.target.files[0];

    var Headers = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    formdata.append("standImage", foto);
    formdata.append("standId", JSON.stringify(id));

    Axios.post(`${APIURL}/admin/edit-stand-photo`, formdata, Headers)
      .then((res) => {
        Axios.post(`${APIURL}/admin/stand`)
          .then((res) => {
            this.setState({
              datakantin: res.data.standResult,
              pager: res.data.pager,
              insertfoto: -1,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onClickPage = (page) => {
    Axios.post(`${APIURL}/admin/stand`, { page })
      .then((res) => {
        this.setState({
          datakantin: res.data.standResult,
          pager: res.data.pager,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderkantin = () => {
    return this.state.datakantin.map((val, index) => {
      return (
        <TableRow key={index}>
          <TableCell align="center">{val.profileId}</TableCell>
          <TableCell align="center">
            {this.state.insertfoto === val.profileId ? (
              <Button variant="contained" component="label">
                Upload File
                <input type="file" style={{ display: "none" }} onChange={(e) => this.onEditPhoto(e, val.profileId)} />
              </Button>
            ) : (
              <img
                className="card-img-top"
                style={{ height: "80px", width: "120px" }}
                src={APIURL + val.standPhoto}
                alt="Canteen's Profile"
                onClick={() => {
                  console.log(index);
                  this.setState({ insertfoto: val.profileId });
                }}
              />
            )}
          </TableCell>
          <TableCell>
            Nama <span style={{ paddingLeft: "30px" }}>: {val.standName}</span> <br />
            Lokasi <span style={{ paddingLeft: "27px" }}>: {val.standAddress}</span> <br />
            Whatsapp <span style={{ paddingLeft: "6px" }}>: {val.standContact}</span> <br />
          </TableCell>
          <TableCell align="center">
            <Button
              onClick={() => this.setState({ idedit: val.profileId, indexedit: index, modaledit: true })}
              variant="outlined"
              style={{ width: "150px", marginBottom: "5px", color: purple.A200 }}>
              Edit Profile
            </Button>
            <Button
              component={Link}
              to={"/admin/managemenus/" + val.profileId}
              variant="outlined"
              style={{ width: "150px", marginBottom: "5px", color: blue.A200 }}>
              Detail Menu
            </Button>
            <Button
              onClick={() => this.onClickDelete(val.profileId, index)}
              variant="outlined"
              style={{ width: "150px" }}
              color="secondary">
              Delete
            </Button>
          </TableCell>
        </TableRow>
      );
    });
  };

  render() {
    const { pager } = this.state;

    if (this.state.loading) {
      return (
        <div>
          <div className="loading">Loading&#8230;</div>
        </div>
      );
    }

    return (
      <div style={{ minHeight: "70vh" }}>
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
                    placeholder="628xxx"
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
                    defaultValue={this.state.datakantin[this.state.indexedit].standName}
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
                    defaultValue={this.state.datakantin[this.state.indexedit].standAddress}
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
                    defaultValue={this.state.datakantin[this.state.indexedit].standContact}
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
                  <TableCell align="center" style={{ width: "10vw" }}>
                    ID.
                  </TableCell>
                  <TableCell align="center" style={{ width: "20vw" }}>
                    Foto
                  </TableCell>
                  <TableCell align="left" style={{ width: "50vw" }}>
                    Profil
                  </TableCell>
                  <TableCell align="center" style={{ width: "20vw" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={4}>
                    <Box mb={1} mt={1}>
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
                </TableRow>
                {this.renderkantin()}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">
          {pager.pages && pager.pages.length && (
            <ul className="pagination">
              <li className={`page-item first-item ${pager.currentPage === 1 ? "disabled" : ""}`}>
                <Button
                  disabled={pager.currentPage === 1 ? true : false}
                  onClick={() => {
                    this.onClickPage(pager.startPage);
                  }}>
                  First
                </Button>
              </li>
              <li className={`page-item previous-item ${pager.currentPage === 1 ? "disabled" : ""}`}>
                <Button
                  disabled={pager.currentPage === 1 ? true : false}
                  onClick={() => {
                    this.onClickPage(pager.currentPage - 1);
                  }}>
                  Previous
                </Button>
              </li>
              {pager.pages.map((page) => (
                <li key={page} className={`page-item number-item ${pager.currentPage === page ? "active" : ""}`}>
                  <Button
                    onClick={() => {
                      this.onClickPage(page);
                    }}>
                    {page}
                  </Button>
                </li>
              ))}
              <li className={`page-item next-item ${pager.currentPage === pager.totalPages ? "disabled" : ""}`}>
                <Button
                  disabled={pager.currentPage === pager.totalPages ? true : false}
                  onClick={() => {
                    this.onClickPage(pager.currentPage + 1);
                  }}>
                  Next
                </Button>
              </li>
              <li className={`page-item last-item ${pager.currentPage === pager.totalPages ? "disabled" : ""}`}>
                <Button
                  disabled={pager.currentPage === pager.totalPages ? true : false}
                  onClick={() => {
                    this.onClickPage(pager.totalPages);
                  }}>
                  Last
                </Button>
              </li>
            </ul>
          )}
        </Box>
      </div>
    );
  }
}

export default ManageMerchant;
