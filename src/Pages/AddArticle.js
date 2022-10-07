import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../css/AddArticle.css';
import { Row, Col, Input, Select, Button, DatePicker } from 'antd';
import Markdown from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import servicePath from '../config/apiUrl';
import axios from 'axios';

const { Option } = Select;
const { TextArea } = Input;

function AddArticle() {
  const [articleId, setArticleId] = useState(0); //文章ID，如果是0是就新增加的，不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState(''); //文章标题
  const [articleContent, setArticleContent] = useState(''); //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容'); //html内容
  const [introducemd, setIntroducemd] = useState(); //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState('等待编辑'); //简介的html内容
  const [showDate, setShowDate] = useState(); //发布日期
  const [updateDate, setUpdateDate] = useState(); //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]); //文章类别信息
  const [selectType, setSelectType] = useState(1); //选择的文章类型

  //页面加载后只进行一次
  useEffect(() => {
    getTypeInfo();
  }, []);

  //history
  const history = useHistory();

  const md = new Markdown({
    html: false, // Enable HTML tags in source
    xhtmlOut: false, // Use '/' to close single tags (<br />).
    // This is only for full CommonMark compatibility.
    breaks: false, // Convert '\n' in paragraphs into <br>
    langPrefix: 'language-', // CSS language prefix for fenced blocks. Can be
    // useful for external highlighters.
    linkify: false, // Autoconvert URL-like text to links

    // Enable some language-neutral replacement + quotes beautification
    // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js
    typographer: false,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '“”‘’',

    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externally.
    // If result starts with <pre... internal wrapper is skipped.
    // highlight: function (code) {
    //   return hljs.highlightAuto(code).value;
    // }
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return (
            '<pre class="hljs"><code>' +
            hljs.highlight(str, { language: lang, ignoreIllegals: true })
              .value +
            '</code></pre>'
          );
        } catch (__) {}
      }

      return (
        '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
      );
    }
  });

  const changeContent = (e) => {
    setArticleContent(e.target.value);
    let html = md.render(e.target.value);
    setMarkdownContent(html);
  };

  const changeIntroduce = (e) => {
    setIntroducemd(e.target.value);
    let html = md.render(e.target.value);
    setIntroducehtml(html);
  };

  const getTypeInfo = () => {
    axios({
      method: 'get',
      url: servicePath.getTypeInfo,
      //允许跨域，共享session
      withCredentials: true
    }).then((res) => {
      if (res.data.data === '没有登录') {
        localStorage.removeItem('openId');
        history.push('/');
      } else {
        setTypeInfo(res.data.data);
      }
    });
  };

  return (
    <div>
      <Row gutter={10}>
        <Col span={18}>
          <Row gutter={3}>
            <Col span={20}>
              <Input placeholder="博客标题" size="large"></Input>
            </Col>
            <Col span={4}>
              <Select defaultValue="1" size="large">
                <Option value="1">技术文章</Option>
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={35}
                placeholder="文章内容"
                onChange={changeContent}
              />
            </Col>
            <Col span={12} className="show-html">
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              ></div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button size="large">暂存文章</Button>
              &nbsp;
              <Button type="primary" size="large">
                发布文章
              </Button>
              <br />
            </Col>
            <Col span={24}>
              <br />
              <TextArea
                rows={4}
                placeholder="文章简介"
                onChange={changeIntroduce}
              ></TextArea>
              <br />
              <br />
              <div
                className="introduce-html"
                dangerouslySetInnerHTML={{ __html: introducehtml }}
              ></div>
            </Col>
            <Col span={12}>
              <div className="data-select">
                <DatePicker placeholder="发布日期" size="large"></DatePicker>
              </div>
            </Col>
            <Col span={12}>
              <div className="data-select">
                <DatePicker placeholder="修改日期" size="large"></DatePicker>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default AddArticle;
