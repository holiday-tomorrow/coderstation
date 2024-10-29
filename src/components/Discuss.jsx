import { useState, useEffect, useRef } from 'react'
import { Avatar, Button, Comment, Form, Input, List, Pagination, Tooltip, message } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'
import { Editor } from '@toast-ui/react-editor';
import styles from '../css/Discuss.module.css'
import { formatDate } from '../utils/tool'
import { getIssueCommentById, addComment } from '../api/comment'
import { getUserById } from '../api/user'
import { updateIssue } from "../api/issue"
import { editUserInfo } from "../redux/userSlice"
import '@toast-ui/editor/dist/toastui-editor.css';
import "@toast-ui/editor/dist/i18n/zh-cn";
export default function Discuss(props) {
  const { userInfo, isLogin } = useSelector(state => state.user)
  const [commentList, setCommentList] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [value, setValue] = useState('')
  const dispatch = useDispatch()
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    pageSize: 10,
    totalPage: 0
  })
  const fetchCommentList = () => {
    if (props.commentType === 1) {
      getIssueCommentById(props.targetId, {
        current: pageInfo.current,
        pageSize: pageInfo.pageSize
      }).then((res) => {
        getUserInfo(res.data.data)
        setPageInfo({
          current: res.data.current,
          pageSize: res.data.size,
          totalPage: res.data.total
        })
      })
    }
  }
  let getUserInfo = (data) => {
    data?.forEach(item => {
      getUserById(item.userId).then((res) => {
        item.userInfo = res.data
      })
    })
    console.log(data, 'data');
    setCommentList(data)
  }
  useEffect(() => {
    if (props.targetId) {
      fetchCommentList()
    }
  }, [props.targetId, refresh])
  const editorRef = useRef()
  let onSubmit = () => {
    let newComment = null
    if (props.commentType === 1) {
      newComment = editorRef.current.getInstance().getHTML()
      if (newComment === '<p><br></p>') return message.error("评论内容不能为空");
    } else if (props.commentType === 2) {
      newComment = value;
    }
    if (!newComment) return message.error("评论内容不能为空");
    addComment({
      userId: userInfo._id,
      bookId: props.bookInfo?._id,
      issueId: props.issueInfo?._id,
      typeId: props.issueInfo ? props.issueInfo.typeId : props.bookInfo.typeId,
      commentContent: newComment,
      commentType: props.commentType
    }).then((res) => {
      setRefresh(!refresh)
      editorRef.current.getInstance().setHTML("")
      // 该条问答或者书籍的评论数量加一
      if (props.commentType === 1) {
        // 问答评论数 +1
        updateIssue(props.issueInfo._id, {
          commentNumber: ++props.issueInfo.commentNumber
        })
        // 增加对应用户的积分
        dispatch(editUserInfo({ userId: userInfo._id, points: userInfo.points + 4 }));
        message.success("评论添加成功，积分+4");
        editorRef.current.getInstance().setHTML("");
      } else if (props.commentType === 2) {
        // 书籍评论数 + 1
        // updateBook(props.bookInfo._id, {
        //   commentNumber: ++props.bookInfo.commentNumber
        // })
        // 增加对应用户的积分
        dispatch(editUserInfo({ userId: userInfo._id, points: userInfo.points + 2 }));
        message.success("评论添加成功，积分+2");
        setValue("");
      }
    })
  }
  return (
    <div>
      {/* 评论框 */}
      <Comment
        avatar={isLogin ? <Avatar src={userInfo.avatar} /> : <Avatar icon={<UserOutlined />} />}
        content={
          <>
            <Form.Item>
              {
                props?.commentType === 1 ?
                  (
                    <Editor
                      initialValue=""
                      previewStyle="vertical"
                      height="270px"
                      initialEditType="wysiwyg"
                      useCommandShortcut={true}
                      language='zh-CN'
                      ref={editorRef}
                      className="editor"
                    />
                  ) : (
                    <Input.TextArea
                      rows={4}
                      placeholder={isLogin ? "" : "请登录后评论..."}
                      value={value}
                      onChange={e => setValue(e.target.value)}
                    />
                  )
              }
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                disabled={isLogin ? false : true}
                onClick={onSubmit}
              >
                添加评论
              </Button>
            </Form.Item>
          </>
        }
      />
      {/* 评论列表 */}
      {
        commentList?.length > 0
        &&
        <List
          dataSource={commentList}
          header="当前评论"
          itemLayout="horizontal"
          renderItem={(item) => {
            return (
              <Comment
                avatar={<Avatar src={item.userInfo?.avatar} />}
                content={
                  <div
                    dangerouslySetInnerHTML={{ __html: item.commentContent }}
                  ></div>
                }
                datetime={
                  <Tooltip title={formatDate(item.commentDate)}>
                    <span>{formatDate(item.commentDate, 'year')}</span>
                  </Tooltip>
                }
              />
            )
          }}
        />
      }

      {/* 分页 */}
      {
        commentList?.length > 0 ? (
          <div className={styles.paginationContainer}>
            <Pagination showQuickJumper defaultCurrent={1} total={pageInfo.totalPage} />
          </div>
        ) : (
          <div style={{
            fontWeight: "200",
            textAlign: "center",
            margin: "50px"
          }}
          >暂无评论</div>
        )
      }


    </div>
  )
}
