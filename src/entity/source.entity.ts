import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { AdminEntity } from '@/entity/admin.entity'

@Entity('source')
export class SourceEntity {
	@PrimaryGeneratedColumn({ comment: '自增长主键' })
	id: number

	@Column({ comment: '类型名称', nullable: false })
	name: string

	@Column({ comment: '图片', nullable: false })
	picUrl: string

	@Column({ comment: '说明', nullable: false })
	comment: string

	@Column({ comment: '状态', nullable: false, default: 1 })
	status: number

	@Column({
		type: 'timestamp',
		comment: '创建时间',
		default: () => 'CURRENT_TIMESTAMP',
		nullable: false
	})
	createTime: string

	@ManyToOne(
		type => AdminEntity,
		admin => admin.source
	)
	admin: AdminEntity
}
