"""empty message

Revision ID: 5375a0719207
Revises: 1d3be839c3a4
Create Date: 2023-02-28 13:27:57.271046

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5375a0719207'
down_revision = '1d3be839c3a4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('character',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('birth_year', sa.String(length=100), nullable=False),
    sa.Column('gender', sa.String(length=100), nullable=False),
    sa.Column('height', sa.String(length=100), nullable=False),
    sa.Column('skin_color', sa.String(length=100), nullable=False),
    sa.Column('eye_color', sa.String(length=100), nullable=False),
    sa.Column('image', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('eye_color'),
    sa.UniqueConstraint('height'),
    sa.UniqueConstraint('skin_color')
    )
    op.create_table('planet',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('population', sa.String(length=100), nullable=False),
    sa.Column('rotation_period', sa.String(length=100), nullable=False),
    sa.Column('surface_water', sa.String(length=100), nullable=False),
    sa.Column('gravity', sa.String(length=100), nullable=False),
    sa.Column('climate', sa.String(length=100), nullable=False),
    sa.Column('image', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('climate'),
    sa.UniqueConstraint('gravity'),
    sa.UniqueConstraint('rotation_period'),
    sa.UniqueConstraint('surface_water')
    )
    op.create_table('vehicle',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('model', sa.String(length=100), nullable=False),
    sa.Column('manufacturer', sa.String(length=100), nullable=False),
    sa.Column('cost_in_credits', sa.Integer(), nullable=False),
    sa.Column('crew', sa.Integer(), nullable=False),
    sa.Column('passengers', sa.Integer(), nullable=False),
    sa.Column('image', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('crew'),
    sa.UniqueConstraint('name'),
    sa.UniqueConstraint('passengers')
    )
    op.create_table('fav_car',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('char_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['char_id'], ['character.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('fav_planet',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('planet_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['planet_id'], ['planet.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('fav_veh',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('veh_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['veh_id'], ['vehicle.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.String(length=120), nullable=False))
        batch_op.add_column(sa.Column('last_name', sa.String(length=120), nullable=False))
        batch_op.add_column(sa.Column('phone', sa.Integer(), nullable=False))
        batch_op.create_unique_constraint(None, ['phone'])
        batch_op.drop_column('is_active')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_active', sa.BOOLEAN(), autoincrement=False, nullable=False))
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_column('phone')
        batch_op.drop_column('last_name')
        batch_op.drop_column('name')

    op.drop_table('fav_veh')
    op.drop_table('fav_planet')
    op.drop_table('fav_car')
    op.drop_table('vehicle')
    op.drop_table('planet')
    op.drop_table('character')
    # ### end Alembic commands ###
