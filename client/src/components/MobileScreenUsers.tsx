import React from 'react'
import { useChatStore } from '../store/useChatStore'

const MobileScreenUsers: React.FC = () => {
	const {users, selectedUser} = useChatStore();
	return (
		<div>MobileScreenUsers</div>
	)
}

export default MobileScreenUsers