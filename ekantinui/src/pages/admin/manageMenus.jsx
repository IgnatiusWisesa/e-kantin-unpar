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
// material-ui select
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
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
import InputAdornment from "@material-ui/core/InputAdornment";
// numeral
import numeral from "numeral";

import { APIURL } from "../../helpers/APIURL";

class ManageMenus extends Component {
  state = {
    datamenu: [],
    loading: true,
    // modal tambah kantin
    modaladd: false,
    // add menu states starts
    addmenu: "",
    adddeskripsi: "",
    addcategory: "",
    addharga: "",
    // add menu states ends
    // edit menu states starts
    idedit: -1,
    indexedit: 0,
    modaledit: false,
    editmenu: "",
    editdeksripsi: "",
    editcategory: "",
    editharga: "",
    // edit menu states ends
  };

  componentDidMount() {
    Axios.post(`${APIURL}/admin/menu`, { profileId: this.props.match.params.id })
      .then((res) => {
        this.setState({
          datamenu: res.data.menuResult,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onClickSave = () => {
    let merchantid = this.props.match.params.id;
    let menu = this.state.addmenu;
    let deskripsi = this.state.adddeskripsi;
    let kategori = this.state.addcategory;
    let harga = this.state.addharga;

    let menubaru = {
      profileId: merchantid,
      menuName: menu,
      menuDesc: deskripsi,
      menuCategory: kategori,
      menuPrice: harga,
    };

    console.log(menubaru);

    Axios.post(`${APIURL}/admin/add-menu`, menubaru)
      .then((res) => {
        console.log(res.data);
        Axios.post(`${APIURL}/admin/menu`, { profileId: this.props.match.params.id })
          .then((res) => {
            console.log(res.data);
            this.setState({
              datamenu: res.data.menuResult,
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
    console.log(id, index);

    Axios.post(`${APIURL}/admin/delete-menu`, { menuId: id })
      .then((res) => {
        console.log(res.data);
        Axios.post(`${APIURL}/admin/menu`, { profileId: this.props.match.params.id })
          .then((res) => {
            console.log(res.data);
            this.setState({
              datamenu: res.data.menuResult,
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
    console.log(id);
    let index = this.state.indexedit;

    let merchantid = this.props.match.params.id;
    let menu = this.state.editmenu || this.state.datamenu[index].menuName;
    let deskripsi = this.state.editdeskripsi || this.state.datamenu[index].menuDesc;
    let kategori = this.state.editcategory || this.state.datamenu[index].menuCategory;
    let harga = this.state.editharga || this.state.datamenu[index].menuPrice;

    let menuedit = {
      profileId: merchantid,
      menuName: menu,
      menuDesc: deskripsi,
      menuCategory: kategori,
      menuPrice: harga,
    };

    Axios.post(`${APIURL}/admin/edit-menu`, { menuId: id, data: menuedit })
      .then((res) => {
        console.log(res.data);
        Axios.post(`${APIURL}/admin/menu`, { profileId: this.props.match.params.id })
          .then((res) => {
            console.log(res.data);
            this.setState({
              datamenu: res.data.menuResult,
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

  rendermenu = () => {
    if (!this.state.datamenu) {
      return (
        <TableRow>
          <TableCell colSpan={6} align="center">
            Daftar Menu kosong
          </TableCell>
        </TableRow>
      );
    } else {
      return this.state.datamenu.map((val, index) => {
        return (
          <TableRow key={index}>
            <TableCell align="center">{index + 1}</TableCell>
            <TableCell align="center">{val.menuName}</TableCell>
            <TableCell align="left">{val.menuDesc}</TableCell>
            <TableCell align="center">{val.menuCategory}</TableCell>
            <TableCell align="center">{"Rp " + numeral(val.menuPrice).format("Rp,0.00")}</TableCell>
            <TableCell align="center">
              <Box display="flex">
                <Button
                  onClick={() => this.setState({ idedit: val.menuId, indexedit: index, modaledit: true })}
                  variant="outlined"
                  style={{ width: "130px", marginRight: 10, color: purple.A200 }}>
                  Edit Menu
                </Button>
                <Button
                  onClick={() => {
                    this.onClickDelete(val.menuId, index);
                  }}
                  variant="outlined"
                  style={{ width: "130px" }}
                  color="secondary">
                  Delete
                </Button>
              </Box>
            </TableCell>
          </TableRow>
        );
      });
    }
  };

  render() {
    if (this.state.loading) {
      return (
        <div>
          <div className="loading">Loading&#8230;</div>
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
                  <h2 id="transition-modal-title">Input Menu</h2>
                </Box>
                <Box mb={1}>
                  <TextField
                    onChange={(e) => this.setState({ addmenu: e.target.value })}
                    label="Canteen's Menu"
                    style={{ margin: 4 }}
                    placeholder="Menu"
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
                    label="Menu's Description"
                    placeholder="Deskripsi"
                    onChange={(e) => this.setState({ adddeskripsi: e.target.value })}
                    style={{ margin: 4 }}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                </Box>
                <Box mb={1}>
                  <FormControl variant="outlined" style={{ margin: 4, minWidth: 120, width: "100%" }}>
                    <InputLabel htmlFor="add-new-menu-category">Menu's Category</InputLabel>
                    <Select
                      id="add-new-menu-category"
                      value={this.state.addcategory}
                      onChange={(e) => this.setState({ addcategory: e.target.value })}
                      label="Menu's Category ">
                      <MenuItem value="makanan">Makanan</MenuItem>
                      <MenuItem value="minuman">Minuman</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box mb={1}>
                  <TextField
                    label="Menu's Price"
                    placeholder="Harga"
                    onChange={(e) => this.setState({ addharga: e.target.value })}
                    fullWidth
                    margin="normal"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                    }}
                    variant="outlined"
                  />
                </Box>
                <Box ml={20}>
                  <Button onClick={this.onClickSave} variant="outlined" style={{ width: "150px", color: blue.A200 }}>
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
                  <h2 id="transition-modal-title">Edit Menu</h2>
                </Box>
                <Box mb={1}>
                  <TextField
                    onChange={(e) => this.setState({ editmenu: e.target.value })}
                    label="Canteen's Menu"
                    style={{ margin: 4 }}
                    defaultValue={this.state.datamenu[this.state.indexedit].menuName}
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
                    onChange={(e) => this.setState({ editdeskripsi: e.target.value })}
                    label="Menu's Description"
                    style={{ margin: 4 }}
                    defaultValue={this.state.datamenu[this.state.indexedit].menuDesc}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                </Box>
                <Box mb={1}>
                  <FormControl variant="outlined" style={{ margin: 4, minWidth: 120, width: "100%" }}>
                    <InputLabel id="demo-simple-select-outlined-label">Menu's Category</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={this.state.datamenu[this.state.indexedit].menuCategory}
                      // defaultValue={this.state.datamenu[this.state.indexedit].menuCategory}
                      onChange={(e) => this.setState({ editcategory: e.target.value })}
                      label="Menu's Category">
                      <MenuItem value="makanan">Makanan</MenuItem>
                      <MenuItem value="minuman">Minuman</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box mb={1}>
                  <TextField
                    onChange={(e) => this.setState({ editharga: e.target.value })}
                    label="Menu's Price"
                    style={{ margin: 4 }}
                    defaultValue={this.state.datamenu[this.state.indexedit].menuPrice}
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

        <Paper style={{ width: "100%", height: "80vh" }}>
          <TableContainer style={{ maxHeight: 500 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{ width: "10vw" }}>
                    No.
                  </TableCell>
                  <TableCell align="center" style={{ width: "15vw" }}>
                    Menu
                  </TableCell>
                  <TableCell align="center" style={{ width: "30vw" }}>
                    Deskripsi
                  </TableCell>
                  <TableCell align="center" style={{ width: "15vw" }}>
                    Kategori
                  </TableCell>
                  <TableCell align="center" style={{ width: "15vw" }}>
                    Harga
                  </TableCell>
                  <TableCell align="center" style={{ width: "15vw" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6}>
                    <Box mb={1} mt={1} className="d-flex justify-content-center mx-5">
                      <Button
                        component={Link}
                        to={"/admin/managemerchant"}
                        variant="outlined"
                        style={{ width: "150px", marginRight: 20, color: lightGreen.A700 }}>
                        Kembali
                      </Button>
                      <Button
                        onClick={() => {
                          this.setState({ modaladd: true });
                        }}
                        variant="outlined"
                        style={{ width: "150px", marginLeft: 20, color: blue.A200 }}>
                        Tambah Menu
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
                {this.rendermenu()}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    );
  }
}

export default ManageMenus;
