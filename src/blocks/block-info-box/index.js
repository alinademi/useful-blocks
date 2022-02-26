/**
 * WordPress dependencies
 */

 import { __ } from '@wordpress/i18n';
 import { registerBlockType } from '@wordpress/blocks';
 import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
 
 const ALERT_TEMPLATE = [
   [
     'core/paragraph',
     {
       placeholder:
         'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
       className: 'trust-info-box__body-txt',
     },
   ],
   [
     'core/paragraph',
     {
       placeholder:
         'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi',
       className: 'trust-info-box__cite',
     },
   ],
 ];
 
 registerBlockType('tblocks/info-box', {
   title: __('Info Box'),
 
   description: __('Provides custom alert-box.'),
 
   keywords: [__('alert'), __('notfication'), __('info')],
 
   supports: {
     anchor: true,
     // html: false,
     className: false,
   },
 
   category: 'tblocks',
 
   icon: 'info',
 
   styles: [
     {
       name: 'default',
       label: __('Success (default)', 'tblocks'),
       isDefault: true,
     },
     {
       name: 'danger',
       label: __('Danger', 'tblocks'),
     },
     {
       name: 'info',
       label: __('Info', 'tblocks'),
     },
   ],
 
   attributes: {
     content: {
       type: 'string',
     },
   },
 
   edit: () => {
     return (
       <div className='trust-info-box'>
         <InnerBlocks template={ALERT_TEMPLATE} templateLock={'all'} />
       </div>
     );
   },
 
   save: () => {
     return (
       <div className='trust-info-box'>
         <InnerBlocks.Content />
       </div>
     );
   },
 });
 