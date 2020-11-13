import React from 'react';
import { Button } from 'antd';
import { history } from 'umi';
import styles from './index.less';

export default () => {

  return (
    <div className={styles.welcome}>
      <div className={styles.cardBlack}>
        <div className={styles.wrapper}>
          <div>
            <div className={styles.free}>Totaly Free</div>
            <div className={styles.title1}>EasyGif</div>
            <div className={styles.title2}>An online gif editor</div>
            <div className={styles.title2}>Power. And it's easy.</div>
            <Button className={styles.run} onClick={() => {
              history.push('/editor');
            }} type="primary" size="large" shape="round">Run</Button>
            <div className={styles.desc}>Free of watermarks or attribution.</div>
          </div>
          <div>
            <img src="/welcome/intro.png" style={{width: 593, height: 365}} />
          </div>
        </div>
      </div>

      <div className={styles.cardWhite}>
        <div className={styles.wrapper}>
          <div>
            <div className={styles.subTitle}>Where to begin</div>
            <div className={styles.subIntro}>- From a source gif</div>
            <div className={styles.subIntro}>- Convert mp4 to gif</div>
            <div className={styles.subIntro}>- Combine some pictures to gif</div>
          </div>
          <div>
            <img src="/welcome/begin.png" style={{width: 408, height: 387}} />
          </div>
        </div>
      </div>

      <div className={styles.cardBlack}>
        <div className={styles.wrapper}>
          <div>
            <div className={styles.subTitle}>Edit the gif</div>
            <div className={styles.subIntro}>- Adjust animation speed</div>
            <div className={styles.subIntro}>- Reverse</div>
            <div className={styles.subIntro}>- Rotate, flip</div>
            <div className={styles.subIntro}>- Apply filters</div>
          </div>
          <div>
            <img src="/welcome/edit.png" style={{width: 429, height: 350}} />
          </div>
        </div>
      </div>

      <div className={styles.cardWhite}>
        <div className={styles.wrapper}>
          <div>
            <div className={styles.subTitle}>Text, Crop</div>
            <div className={styles.subIntro}>- Add text, and set the attribute</div>
            <div className={styles.subIntro}>- Text appears just in some frames</div>
            <div className={styles.subIntro}>- Crop the gif</div>
          </div>
          <div>
            <img src="/welcome/txtcrop.png" style={{width: 519, height: 485}} />
          </div>
        </div>
      </div>

      <div className={styles.cardBlack}>
        <div className={styles.wrapper}>
          <div>
            <div className={styles.subTitle}>Frame by Frame</div>
            <div className={styles.subIntro}>- Add new frames</div>
            <div className={styles.subIntro}>- Remove frames</div>
          </div>
          <div>
            <img src="/welcome/fbf.png" style={{width: 443, height: 280}} />
          </div>
        </div>
      </div>

      <div className={styles.cardWhite} style={{textAlign: 'center'}}>
        <div className={styles.largeTitle}>
          Export your art.
        </div>
        <div className={styles.largeDesc}>
          Free of watermarks or attribution.
        </div>
        <div>
          <Button type="primary" className={styles.run} onClick={() => {
            history.push('/editor');
          }} size="large" shape="round">Run</Button>
        </div>
      </div>
    </div>
  )
}