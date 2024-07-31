import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import swal from 'sweetalert';
import { Container, Row, Modal, Button } from 'react-bootstrap';
import user from '../../../../images/user.png';
import API_URL from '../../../../config';
import { CSpinner } from '@coreui/react';


const Testimonials = () => {

  const [testimonialTypelist, setTestimonialTypelist] = useState([]);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [visibleedit, setVisibleedit] = useState(false);
  const [id, setId] = useState('');
  const [editname, setEditName] = useState('');
  const [editposition, setEditPosition] = useState('');
  const [editmessage, setEditMessage] = useState('');
  const [editrating, setEditRating] = useState('');
  const [editfile, setEditFile] = useState([]);
  const [editprofile_pic, setEditProfile_pic] = useState([]);
  const [newfile, setNewFile] = useState(0);
  const [newprofile_pic, setNewProfile_pic] = useState('');

  
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState('');
  const [profile_pic, setProfile_pic] = useState('');
  const [rating, setRating] = useState(0);
  const [isloading, setIsloading] = useState(false);





  useEffect(() => {
    getTestimonialList(page, perPage)
  }, [])

  const getTestimonialList = async (page, perPage) => {
    try {
      setIsloading(true)
      const requestOption = {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
      await fetch(`${API_URL}/api/getTestimonialList?page=${page}&limit=${perPage}`, requestOption)
        .then((response) => response.json())
        .then((data) => {
          if (data.status == 200) {
            const total = data.total;
            const slice = total / perPage;
            const pages = Math.ceil(slice);
            setPageCount(pages);
            setTestimonialTypelist(data.data)
            setIsloading(false)

          } else {
            console.log(data.message)
            swal({
              text: data.message,
              icon: "error",
            });
            setIsloading(false)
          }
        })

    } catch (err) {
      console.error(err.message)
    }
  }

  const handlePageClick = (e) => {
    const selectedPage = e.selected + 1;
    setPage(selectedPage);
    getTestimonialList(selectedPage, perPage);
  };

  const getdetails = async (id) => {
    try {
      setEditFile([])
      setEditProfile_pic([])
      setName('')
      setPosition('')
      setMessage('')
      setRating(0)
      setNewFile(0) 
      setNewProfile_pic('')
      setId(id)
      const requestOption = {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
      await fetch(`${API_URL}/api/getTestimonialDetailsById?id=${id}`, requestOption)
        .then((response) => response.json())
        .then((data) => {
          if (data.status == 200) {
            setEditName(data.data.name)
            setEditPosition(data.data.position)
            setEditMessage(data.data.message)
            setEditFile(data.data.file)
            setEditProfile_pic(data.data.profile_pic)
            setEditRating(data.data.rating)
          } else {
            console.log(data.message)
          }
        })

      setVisibleedit(true)
    } catch (err) {
      console.error(err.message)
    }
  }

  const addtestimonialdata = async (e) => {
    e.preventDefault();
   
    try {

      if (!name) {
        swal("Please Enter Name", {
          icon: "warning",
        });
        return;
      }
      else if (!position) {
        swal("Please Enter Designation", {
          icon: "warning",
        });
        return;
      }
      // else if (!message) {
      //   swal("Please Enter Description", {
      //     icon: "warning",
      //   });
      //   return;
      // }
      else if (!rating) {
        swal("Please Enter Rating", {
          icon: "warning",
        });
        return;
      }
      else if (rating < 0 || rating > 5) {
        swal("Rating should be in range of 0 - 5", {
          icon: "warning",
        });
        return;
      }
      else{

        const formData = new FormData();
        formData.append('name', name);
        formData.append('position', position);
        formData.append('message', message);
        formData.append('file', file);
        formData.append('profile', profile_pic);
        formData.append('rating', rating);

        console.log(Array.from(formData))


      const requestOption = {
        method: "POST",
        body: formData,
      }
      await fetch(`${API_URL}/api/addTestimonial`, requestOption)
        .then((response) => response.json())
        .then((data) => {
          if (data.status == 200) {
            swal(data.message, {
              icon: "success",
            });
            setShowModal(false)
            getTestimonialList(page, perPage)
          } else {
            swal(data.message, {
              icon: "error",
            });
          }
        })
      }
    } catch (err) {
      console.error(err.message)
    }
  }

  const updateusertype = async (e) => {
    e.preventDefault();
    try {

      if (!editname) {
        swal("Please Enter Name", {
          icon: "warning",
        });
        return;
      }
      else if (!editposition) {
        swal("Please Enter Designation", {
          icon: "warning",
        });
        return;
      }
      // else if (!editmessage) {
      //   swal("Please Enter Description", {
      //     icon: "warning",
      //   });
      //   return;
      // }

      else if (!editrating) {
        swal("Please Enter Rating", {
          icon: "warning",
        });
        return;
      }
      else if (editrating < 0 || editrating > 5) {
        swal("Rating should be in range of 0 - 5", {
          icon: "warning",
        });
        return;
      }
      else {

        const formData = new FormData();
        formData.append('id', id);
        formData.append('name', editname);
        formData.append('position', editposition);
        formData.append('message', editmessage);
        formData.append('file', !newfile ? JSON.stringify(editfile) : newfile);
        formData.append('profile', !newprofile_pic ? JSON.stringify(editprofile_pic) : newprofile_pic);
        formData.append('rating', editrating);


        console.log(Array.from(formData))

        // return false;
        await fetch(`${API_URL}/api/updateTestimonial`, {
        method: 'put',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          if (data.status == 200) {
            setVisibleedit(false)
            swal({
              text: data.message,
              type: "success",
              icon: "success"
            }).then(function () {
              getTestimonialList(page, perPage);
            });
          }
          else {
            setVisibleedit(false)
            swal({
              text: data.message,
              type: "error",
              icon: "error"
            }).then(function () {
              getTestimonialList(page, perPage);

            });
          }
        });
      }
    } catch (err) {
      console.error(err.message)
    }
  }

  const updatestatus = (id, status) => {
    try {
      const requestOption = {
        method: 'Put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: status, id: id })
      }
      fetch(`${API_URL}/api/updateTestimonialStatus`, requestOption)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if (data.status === 200) {
            swal({
              text: "Status Updated Successfully",
              icon: "success",
              button: "OK",
            });
            getstafflist(page, perPage)
          } else {
            swal({
              text: "Status Not Updated",
              icon: "error",
              button: "OK",
            });
          }
        })
        .catch(err => {
          console.log(err)
        })
    } catch (err) {
      console.log(err)
    }
  }

  const deleteusertype = (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this Type?")) {
        const requestOption = {
          method: 'Delete',
          headers: { 'Content-Type': 'application/json' },
        }
        fetch(`${API_URL}/api/deleteTestimonial?id=${id}`, requestOption)
          .then(response => response.json())
          .then(data => {
            if (data.status === 200) {
              swal({
                text: "Testimonial Deleted Successfully",
                icon: "success",
                button: "OK",
              });
              getTestimonialList(page, perPage)
            } else {
              swal({
                text: "Testimonial Not Deleted",
                icon: "error",
                button: "OK",
              });
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    } catch (err) {
      console.log(err)
    }
  }

  const startFrom = (page - 1) * perPage;

  console.log('editfile', editfile)
  console.log('editprofile_pic', editprofile_pic)

  // const allowOnlyNumbers = (e) => {
  //   e.preventDefault();
  //   const input = e.target;
  //   const value = input.value.replace(/[^\d]/g, ''); // Replace any non-numeric characters with an empty string
  //   input.value = value; // Set the input value to the filtered value
  // };

  const allowOnlyNumbers = (e) => {
    e.preventDefault();
    const input = e.target;
    let value = input.value.replace(/[^\d.]/g, ''); // Replace any non-numeric characters except the decimal point

    // Ensure there's only one decimal point
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join(''); // Keep the first decimal point and remove the others
    }

    input.value = value; // Set the input value to the filtered value
  };



  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <div className="row">
                    <div className="col-md-6">
                      <h4 className="card-title">Testimonials</h4>
                    </div>

                    <div className="col-md-6">
                      <button className='btn btn-primary' style={{ float: "right" }} onClick={() => setShowModal(true)}>Add</button>
                    </div>

                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Sr No.</th>
                            <th>Name</th>
                            <th>Designation</th>
                            <th>Description</th>
                            <th>Rating</th>
                            <th>File</th>
                            <th>Profile Picture</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                            {isloading ? (
                              <tr>

                                <td colSpan={9} className='loadercenter'> <CSpinner color="primary" variant="grow" /></td>

                              </tr>
                            ) : (

                              <>
                        {testimonialTypelist?.length > 0 ?
                          testimonialTypelist?.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{startFrom + index + 1}</td>
                                <td>{item?.name}</td>
                                <td>{item?.position}</td>
                                <td className='text-wrap'>{item?.message}</td>
                                <td>{item?.rating}</td>
                                <td>
                                { item?.file?.map((file, index1) => {
                                  if (file?.mimetype?.includes('image')) {
                                  return (
                                    <img key={index1} src={`${API_URL}/uploads/testimonials/${file?.filename}`} alt="image" height={100} width={100} />
                                  )
                                } else if (file.mimetype.includes('video')){
                                  return (
                                    <video key={index1} width="100" height="100" controls>
                                      <source src={`${API_URL}/uploads/testimonials/${file?.filename}`} type="video/mp4" />
                                    </video>
                                )
                                }
                                }
                              )}
                                </td>
                                <td>
                                  {
                                  item?.profile_pic[0]?.filename ?
                                      <img src={`${API_URL}/uploads/profile_pic/${item?.profile_pic[0]?.filename}`} alt='image' height={100} width={100} />
                                  : 
                                      <img src={user} alt='image' height={100} width={100} />
                                  }
                                </td>
                                <td>
                                  <div className="form-check form-switch">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id={`statusSwitch_${index}`}
                                      defaultChecked={item.status === 1}
                                      onChange={async (e) => {
                                        const isChecked = e.target.checked;
                                        if (window.confirm(`Are you sure you want to ${isChecked ? 'activate' : 'deactivate'} this Type?`)) {
                                          // Update the item status based on the checkbox state
                                          const newStatus = isChecked ? 1 : 0;
                                          // Call the updatestatus function to update the status in the backend
                                          await updatestatus(item._id, newStatus);
                                          // // Show success alert
                                          // alert(`Item ${isChecked ? 'activated' : 'deactivated'} successfully.`);
                                        } else {
                                          // If user cancels, revert checkbox state
                                          e.target.checked = !isChecked;
                                        }
                                      }}
                                    />
                                    {/* <label className="form-check-label" htmlFor={`statusSwitch_${index}`}>
                                                                    {item.status === 1 ? "Active" : "Inactive"}
                                                                </label> */}
                                  </div>
                                </td>
                                <td>
                                  <button className="btn btn-primary" onClick={() => getdetails(item._id)}>Edit</button>{' '}
                                  <button className="btn btn-danger" onClick={() => deleteusertype(item._id)}>Delete</button>
                                </td>
                              </tr>
                            )
                          })
                                  :
                                  <tr>
                                    <td colSpan={9} className='loadercenter'>No Records Found</td>
                                  </tr>
                                }
                              </>
                            )}

                        </tbody>
                      </table>
                      <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination justify-content-end"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakClassName={"page-item"}
                        breakLinkClassName={"page-link"}
                        activeClassName={"active"}
                      />
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal size='lg' show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Testimonial</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="card">

                  <div className="card-body">
                    <form action="/" method="POST">
                      <div className="row">
                        <div className="col-md-6 mb-3">

                          <label className="form-label"><strong>Add Name</strong></label>
                          <input type='text' className="form-control"
                            name='type'
                            placeholder='Enter Name'
                            defaultValue=""
                            required
                            autoComplete="off"
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="col-md-6 mb-3">

                      <label className="form-label"><strong>Add Designation</strong></label>
                      <input type='text' className="form-control"
                        name='type'
                        placeholder='Enter Designation'
                        defaultValue=""
                        required
                        autoComplete="off"
                            onChange={(e) => setPosition(e.target.value)}
                      />
                    </div>
                        <div className="col-md-6 mb-3">

                      <label className="form-label"><strong>Add Description</strong></label>
                      {/* <input type='text' className="form-control"
                        name='type'
                        placeholder='Enter Description'
                        defaultValue=""
                        required
                        autoComplete="off"
                        onChange={(e) => setMessage(e.target.value)}
                      /> */}
                      <textarea className="form-control" placeholder='Enter Description' id="exampleFormControlTextarea1" rows="3" onChange={(e) => setMessage(e.target.value)} autoComplete="off"></textarea>
                    </div>

                        <div className="col-md-6 mb-3">
                          <label className="form-label"><strong>Add Rating</strong></label>
                          <input type='text' className="form-control"
                            name='type'
                            placeholder='Enter Rating'
                            defaultValue=""
                            required
                            autoComplete="off"
                            min={0}
                            max={5}
                            onInput={allowOnlyNumbers}
                            onChange={(e) => setRating(e.target.value)}
                            
                          />
                        </div>

                      <div className="col-md-6 mb-3">
                      <label className="form-label"><strong>Add File</strong></label>
                      <input type='file' className="form-control"
                        name='type'
                        placeholder='Enter Looking For Type'
                        defaultValue=""
                        required
                        autoComplete="off"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                    </div>
                        <div className="col-md-6 mb-3">

                      <label className="form-label"><strong>Add Profile picture</strong></label>
                      <input type='file' className="form-control"
                        name='type'
                        placeholder='Enter Looking For Type'
                        defaultValue=""
                        required
                        autoComplete="off"
                        onChange={(e) => setProfile_pic(e.target.files[0])}
                        accept='image/*'
                      />
                    </div>
                      </div>
                      {/* <div className="row">
                        <div className="col-md-12">
                        </div>
                      </div> */}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="submit" className="btn btn-primary mt-2 submit_all" style={{ float: "right" }} onClick={addtestimonialdata}>Submit</button>
          <button className="btn btn-secondary mt-2 submit_all" onClick={() => setShowModal(false)}>
            Close
          </button>
        </Modal.Footer>
      </Modal>

      <Modal size='lg' show={visibleedit} onHide={() => setVisibleedit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Testimonial</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {/* <div className="card"> */}
                  {/* <div className="card-body"> */}
                    <form action="/" method="POST">
                      <div className="row">
                        <div className="col-md-6">
                          <label className="form-label"><strong>Edit Name</strong></label>
                          <input type='text' className="form-control"
                            name='type'
                            placeholder='Enter Name'
                            defaultValue={editname}
                            required
                            autoComplete="off"
                            onChange={(e) => setEditName(e.target.value)}
                          />
                        </div>
                    <div className="col-md-6 mb-3">

                      <label className="form-label"><strong>Edit Designation</strong></label>
                      <input type='text' className="form-control"
                        name='type'
                        placeholder='Enter Designation'
                        defaultValue={editposition}
                        required
                        autoComplete="off"
                        onChange={(e) => setEditPosition(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mb-3">

                      <label className="form-label"><strong>Edit Description</strong></label>
                      <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => setEditMessage(e.target.value)}>
                        {editmessage}
                      </textarea>

                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label"><strong>Edit Rating</strong></label>
                      <input type='text' className="form-control"
                        name='type'
                        placeholder='Enter Rating'
                        defaultValue={editrating}
                        required
                        autoComplete="off"
                        min={0}
                        max={5}
                        onInput={allowOnlyNumbers}
                        onChange={(e) => setEditRating(e.target.value)}

                      />
                    </div>

                    <div className="row">
                    <div className="col-md-6 mb-3">

                      <label className="form-label"><strong>Edit File</strong></label>
                        <input type='file' className="form-control mb-3"
                        name='type'
                        placeholder='Enter Looking For Type'
                        required
                        autoComplete="off"
                          onChange={(e) => setNewFile(e.target.files[0])}
                      />
                   
                      <label className="form-label"><strong>File</strong></label>
                        <div className='card'>
                          {editfile.map((file, index) => {
                            if (file.mimetype.includes('image')) {
                              return (
                                <img src={`${API_URL}/uploads/testimonials/${file.filename}`} alt="image" height={100} width={100} />
                              )
                            } else if (file.mimetype.includes('video')) {
                              return (
                                <video width="100" height="100" controls>
                                  <source src={`${API_URL}/uploads/testimonials/${file.filename}`} type="video/mp4" />
                                </video>
                              )
                            }
                          }
                          )}
                        </div>

                  </div>
                    <div className="col-md-6 mb-3">

                      <label className="form-label"><strong>Edit Profile picture</strong></label>
                        <input type='file' className="form-control mb-3"
                        name='type'
                        placeholder='Enter Looking For Type'
                        defaultValue=""
                        required
                        autoComplete="off"
                        onChange={(e) => setNewProfile_pic(e.target.files[0])}
                        accept='image/*'
                      />
                      <label className="form-label"><strong>Profile Picture</strong></label>
                      <div className='card'>
                      {
                        editprofile_pic[0]?.filename ?
                          <img src={`${API_URL}/uploads/profile_pic/${editprofile_pic[0]?.filename}`} alt='image' height={100} width={100} />
                          :
                          <img src={user} alt='image' height={100} width={100} />
                      }
                      </div>
                    </div>
                    </div>

                      </div>
                      {/* <div className="row">
                        <div className="col-md-12">
                        </div>
                      </div> */}
                    </form>
                  </div>
                {/* </div> */}
              {/* </div> */}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="submit" className="btn btn-primary mt-2 submit_all" style={{ float: "right" }} onClick={updateusertype}>Submit</button>
          <button className="btn btn-secondary mt-2 submit_all" onClick={() => setVisibleedit(false)}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Testimonials;