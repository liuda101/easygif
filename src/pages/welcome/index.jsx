import React from 'react';
import { Typography, Row, Col, Button } from 'antd';
import { history } from 'umi';

export default () => {
  return (
    <div style={{
      width: 1000,
      margin: '0 auto'
    }}>
      <Row type="flex" justify="space-between" align="middle">
        <Col>
          <Typography.Title>
            EasyGif
          </Typography.Title>
        </Col>
        <Col>
          <Button type="primary" onClick={() => {
            history.replace('/editor');
          }}>RUN</Button>
        </Col>
      </Row>

      <Typography>
        EasyGif is a free online gif editor. 
      </Typography>
      <br/>
      <Typography>
        It allows you to create your own animated GIFs by edit an existing gif, transform a video(mp4 for now) to a gif, and create a gif by combining separated image files.
      </Typography>
      <br/>
      <Typography>
        Produced GIFs are free of watermarks or attribution, making this tool ideal for developers and content creators.
      </Typography>
      <br/>
      <Typography>
        To make a gif, you can upload a source gif, then apply transforms/filters to it or add some texts to it. Also, you can remove some frames to generate another gif.
      </Typography>
      <br/>
      <Typography>
        You can also upload a video(mp4 for now). It will transform the video to a gif. Then you can do the samething(transform/filter/add text, etc) to it.
      </Typography>
      <br/>
      <Typography>
        You may also upload a sequence of JPG, PNG images to make a gif.
      </Typography>
      <br/>
      <Typography>
        EasyGif use the browser tech to do all things. It's a pure JS/CSS/HTML application.
      </Typography>
    </div>
  )
}