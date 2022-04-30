import React, { useEffect } from 'react'
import { Modal, Form, Input, Rate, notification } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../redux/meeting/actions'
import 'antd/dist/antd.css'
import { POST, GET } from '../../services/axios/common.api'

const Rating = ({ open, getCallRating, mediaCallId }) => {
  // const [rating, setRating] = useState(0)
  const { setCallId } = useSelector((state) => state.meeting)
  const { selectedRole } = useSelector((state) => state.user)
  const { TextArea } = Input
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const isCallFeedbackModal = async () => {
    const {
      data: { body },
    } = await GET(`userratings?callid=${mediaCallId}`)
    form.setFieldsValue(body)
  }
  const postRating = async (values) => {
    POST('userratings', {
      callid: setCallId,
      ...values,
      isDoctor: 1,
      userId: selectedRole?.role === 'DOCTOR' ? selectedRole?.EmployeeID : null,
    })
      .then(() => {
        form.resetFields()
      })
      .catch(() => {
        notification.error({
          message: 'Somthing Went Wrong',
        })
      })
    dispatch({
      type: actions.CALL_END,
      payload: false,
    })
  }

  useEffect(() => {
    isCallFeedbackModal()
  }, [mediaCallId])
  const close = () => {
    dispatch({
      type: actions.CALL_END,
      payload: false,
    })
    form.resetFields()
  }
  const clearTheRating = () => {
    form.resetFields()
    dispatch({
      type: actions.CALL_END,
      payload: false,
    })
  }
  return (
    <div>
      <Modal visible={open} footer={null} onOk={postRating} onCancel={close}>
        <Form layout="vertical" form={form} onFinish={postRating}>
          <h4 className="mt-3 text-center">How was the audio and video quality ?</h4>
          <div className="row">
            <div className="col-12 text-center">
              <Form.Item name="rating">
                <Rate style={{ fontSize: 'xxx-large' }} disabled={getCallRating} />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Form.Item name="comments">
                <TextArea
                  className="form-control"
                  rows={4}
                  placeholder="Feedback"
                  disabled={getCallRating}
                />
              </Form.Item>
            </div>
          </div>
          <div className="row ml-1 mr-1">
            {!getCallRating && (
              <>
                <div className="pt-4 pr-3">
                  <Form.Item>
                    <button type="submit" className="btn btn-primary px-5">
                      submit
                    </button>
                  </Form.Item>
                </div>
                <div className="pt-4 pr-3">
                  <Form.Item>
                    <button type="button" className="btn btn-light px-5" onClick={clearTheRating}>
                      Cancel
                    </button>
                  </Form.Item>
                </div>
              </>
            )}
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default Rating
