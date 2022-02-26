import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { Placeholder, Dashicon } from '@wordpress/components';

registerBlockType('tblocks/interview-carousel', {
  title: __('Latest Interviews', 'tblocks'),
  icon: 'microphone',
  category: 'tblocks',

  edit: () => {
    return (
      <Placeholder>
        <div
          className='border radius pop-the-box bg-lightgrey'
          style={{
            padding: '1.75rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <Dashicon
            icon='microphone'
            style={{
              fontSize: '5rem',
              width: '5rem',
              height: '5rem',
              color: '#eb0029',
            }}
          />
          <p
            classname='column-center clr-primary'
            style={{
              fontFamily: 'Shabnam',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#4e5469',
              margin: '1rem 0',
            }}
          >
            Interviews block
          </p>
        </div>
      </Placeholder>
    );
  },

  save() {
    return null;
  },
});
